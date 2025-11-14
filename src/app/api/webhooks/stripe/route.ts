import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSubscription, updateSubscriptionStatus } from '@/lib/subscription';

export async function POST(req: NextRequest) {
  // Validar variáveis de ambiente dentro da função
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY não configurada');
    return NextResponse.json(
      { error: 'Configuração do servidor incompleta' },
      { status: 500 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn('⚠️ STRIPE_WEBHOOK_SECRET não configurada - webhooks não funcionarão em produção');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('❌ Assinatura do webhook ausente');
    return NextResponse.json(
      { error: 'Assinatura do webhook ausente' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('❌ Erro ao verificar webhook:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log('📨 Webhook recebido:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Checkout completado:', session.id);

        // Extrair dados do metadata
        const userId = session.metadata?.userId;
        const planType = session.metadata?.planType as 'monthly' | 'quarterly' | 'annual';

        if (!userId || !planType) {
          console.error('❌ Metadata ausente no checkout:', session.metadata);
          break;
        }

        // Buscar subscription do Stripe
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (!subscriptionId || !customerId) {
          console.error('❌ SubscriptionId ou CustomerId ausente');
          break;
        }

        // Criar assinatura no banco de dados
        await createSubscription(userId, planType, subscriptionId, customerId);
        console.log('✅ Assinatura criada no banco:', {
          userId,
          planType,
          subscriptionId
        });

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🔄 Assinatura atualizada:', subscription.id);

        const status = subscription.status === 'active' ? 'active' : 
                      subscription.status === 'past_due' ? 'past_due' : 'canceled';

        await updateSubscriptionStatus(subscription.id, status);
        console.log('✅ Status atualizado no banco:', status);

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Assinatura cancelada:', subscription.id);

        await updateSubscriptionStatus(subscription.id, 'canceled');
        console.log('✅ Assinatura marcada como cancelada no banco');

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('⚠️ Pagamento falhou:', invoice.id);

        if (invoice.subscription) {
          await updateSubscriptionStatus(invoice.subscription as string, 'past_due');
          console.log('✅ Assinatura marcada como past_due');
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('✅ Pagamento bem-sucedido:', invoice.id);

        if (invoice.subscription) {
          await updateSubscriptionStatus(invoice.subscription as string, 'active');
          console.log('✅ Assinatura reativada');
        }

        break;
      }

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
