import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSubscription, updateSubscriptionStatus } from '@/lib/subscription';

// ============================================
// CONFIGURAÇÃO DO STRIPE
// ============================================

function getStripeInstance(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY não configurada');
  }

  return new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia',
  });
}

function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET não configurada');
  }

  return secret;
}

// ============================================
// HANDLERS DE EVENTOS
// ============================================

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('🎉 Checkout completado:', {
    sessionId: session.id,
    customerId: session.customer,
    subscriptionId: session.subscription,
  });

  // Extrair dados necessários
  const userId = session.metadata?.userId || session.client_reference_id;
  const planType = session.metadata?.planType as 'monthly' | 'quarterly' | 'annual';
  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  // Validar dados
  if (!userId) {
    throw new Error('userId não encontrado no metadata ou client_reference_id');
  }

  if (!planType) {
    throw new Error('planType não encontrado no metadata');
  }

  if (!subscriptionId) {
    throw new Error('subscriptionId não encontrado na sessão');
  }

  if (!customerId) {
    throw new Error('customerId não encontrado na sessão');
  }

  console.log('📝 Dados extraídos:', {
    userId,
    planType,
    subscriptionId,
    customerId,
  });

  // Criar assinatura no banco
  const subscription = await createSubscription(
    userId,
    planType,
    subscriptionId,
    customerId
  );

  console.log('✅ Assinatura criada no banco:', {
    id: subscription.id,
    status: subscription.status,
    startDate: subscription.start_date,
    endDate: subscription.end_date,
  });

  return subscription;
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('🔄 Assinatura atualizada:', {
    subscriptionId: subscription.id,
    status: subscription.status,
  });

  // Mapear status do Stripe para nosso sistema
  let status: 'active' | 'canceled' | 'past_due';
  
  if (subscription.status === 'active') {
    status = 'active';
  } else if (subscription.status === 'past_due') {
    status = 'past_due';
  } else {
    status = 'canceled';
  }

  // Atualizar no banco
  await updateSubscriptionStatus(subscription.id, status);

  console.log('✅ Status atualizado no banco:', status);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('❌ Assinatura cancelada:', {
    subscriptionId: subscription.id,
  });

  // Marcar como cancelada no banco
  await updateSubscriptionStatus(subscription.id, 'canceled');

  console.log('✅ Assinatura marcada como cancelada no banco');
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('⚠️ Pagamento falhou:', {
    invoiceId: invoice.id,
    subscriptionId: invoice.subscription,
    attemptCount: invoice.attempt_count,
  });

  if (invoice.subscription) {
    await updateSubscriptionStatus(invoice.subscription as string, 'past_due');
    console.log('✅ Assinatura marcada como past_due');
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('✅ Pagamento bem-sucedido:', {
    invoiceId: invoice.id,
    subscriptionId: invoice.subscription,
    amountPaid: invoice.amount_paid / 100,
  });

  if (invoice.subscription) {
    await updateSubscriptionStatus(invoice.subscription as string, 'active');
    console.log('✅ Assinatura reativada');
  }
}

// ============================================
// HANDLER PRINCIPAL
// ============================================

export async function POST(req: NextRequest) {
  try {
    // 1. Validar configuração
    const stripe = getStripeInstance();
    const webhookSecret = getWebhookSecret();

    // 2. Obter body e signature
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('❌ Assinatura do webhook ausente');
      return NextResponse.json(
        { error: 'Assinatura do webhook ausente' },
        { status: 400 }
      );
    }

    // 3. Verificar assinatura do webhook
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ Webhook verificado:', event.type);
    } catch (err: any) {
      console.error('❌ Erro ao verificar webhook:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log('📨 Evento recebido:', {
      type: event.type,
      id: event.id,
      created: new Date(event.created * 1000).toISOString(),
    });

    // 4. Processar evento
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;

        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;

        case 'invoice.payment_failed':
          await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.payment_succeeded':
          await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;

        default:
          console.log(`ℹ️ Evento não tratado: ${event.type}`);
      }

      // 5. Retornar sucesso
      return NextResponse.json({
        received: true,
        eventType: event.type,
        eventId: event.id,
      });

    } catch (processingError: any) {
      console.error('❌ Erro ao processar evento:', {
        error: processingError.message,
        eventType: event.type,
        eventId: event.id,
      });

      return NextResponse.json(
        {
          error: processingError.message || 'Erro ao processar evento',
          eventType: event.type,
          eventId: event.id,
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('❌ Erro geral no webhook:', {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: error.message || 'Erro no webhook',
      },
      { status: 500 }
    );
  }
}
