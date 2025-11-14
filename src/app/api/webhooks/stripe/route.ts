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
    console.error('❌ STRIPE_WEBHOOK_SECRET não configurada - webhooks não funcionarão');
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET não configurada' },
      { status: 500 }
    );
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
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Webhook verificado com sucesso:', event.type);
  } catch (err: any) {
    console.error('❌ Erro ao verificar webhook:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log('📨 Webhook recebido:', {
    type: event.type,
    id: event.id,
    created: new Date(event.created * 1000).toISOString()
  });

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('🎉 Checkout completado:', {
          sessionId: session.id,
          customerId: session.customer,
          subscriptionId: session.subscription,
          metadata: session.metadata
        });

        // Extrair dados do metadata
        const userId = session.metadata?.userId;
        const planType = session.metadata?.planType as 'monthly' | 'quarterly' | 'annual';

        if (!userId) {
          console.error('❌ userId ausente no metadata:', session.metadata);
          return NextResponse.json(
            { error: 'userId ausente no metadata' },
            { status: 400 }
          );
        }

        if (!planType) {
          console.error('❌ planType ausente no metadata:', session.metadata);
          return NextResponse.json(
            { error: 'planType ausente no metadata' },
            { status: 400 }
          );
        }

        // Buscar subscription do Stripe
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (!subscriptionId) {
          console.error('❌ subscriptionId ausente na sessão');
          return NextResponse.json(
            { error: 'subscriptionId ausente' },
            { status: 400 }
          );
        }

        if (!customerId) {
          console.error('❌ customerId ausente na sessão');
          return NextResponse.json(
            { error: 'customerId ausente' },
            { status: 400 }
          );
        }

        console.log('📝 Criando assinatura no banco:', {
          userId,
          planType,
          subscriptionId,
          customerId
        });

        // Criar assinatura no banco de dados
        try {
          const subscription = await createSubscription(
            userId,
            planType,
            subscriptionId,
            customerId
          );
          
          console.log('✅ Assinatura criada com sucesso no banco:', {
            id: subscription.id,
            userId: subscription.user_id,
            status: subscription.status,
            planType: subscription.plan_type,
            startDate: subscription.start_date,
            endDate: subscription.end_date
          });
        } catch (dbError: any) {
          console.error('❌ Erro ao criar assinatura no banco:', {
            error: dbError.message,
            code: dbError.code,
            details: dbError.details
          });
          throw dbError;
        }

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🔄 Assinatura atualizada:', {
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString()
        });

        const status = subscription.status === 'active' ? 'active' : 
                      subscription.status === 'past_due' ? 'past_due' : 'canceled';

        try {
          await updateSubscriptionStatus(subscription.id, status);
          console.log('✅ Status atualizado no banco:', {
            subscriptionId: subscription.id,
            newStatus: status
          });
        } catch (dbError: any) {
          console.error('❌ Erro ao atualizar status no banco:', {
            error: dbError.message,
            subscriptionId: subscription.id
          });
          throw dbError;
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Assinatura cancelada:', {
          subscriptionId: subscription.id,
          canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null
        });

        try {
          await updateSubscriptionStatus(subscription.id, 'canceled');
          console.log('✅ Assinatura marcada como cancelada no banco');
        } catch (dbError: any) {
          console.error('❌ Erro ao cancelar assinatura no banco:', {
            error: dbError.message,
            subscriptionId: subscription.id
          });
          throw dbError;
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('⚠️ Pagamento falhou:', {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription,
          attemptCount: invoice.attempt_count
        });

        if (invoice.subscription) {
          try {
            await updateSubscriptionStatus(invoice.subscription as string, 'past_due');
            console.log('✅ Assinatura marcada como past_due');
          } catch (dbError: any) {
            console.error('❌ Erro ao marcar como past_due:', {
              error: dbError.message,
              subscriptionId: invoice.subscription
            });
            throw dbError;
          }
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('✅ Pagamento bem-sucedido:', {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription,
          amountPaid: invoice.amount_paid / 100
        });

        if (invoice.subscription) {
          try {
            await updateSubscriptionStatus(invoice.subscription as string, 'active');
            console.log('✅ Assinatura reativada');
          } catch (dbError: any) {
            console.error('❌ Erro ao reativar assinatura:', {
              error: dbError.message,
              subscriptionId: invoice.subscription
            });
            throw dbError;
          }
        }

        break;
      }

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ 
      received: true,
      eventType: event.type,
      eventId: event.id
    });
  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', {
      error: error.message,
      stack: error.stack,
      eventType: event.type,
      eventId: event.id
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao processar webhook',
        eventType: event.type,
        eventId: event.id
      },
      { status: 500 }
    );
  }
}
