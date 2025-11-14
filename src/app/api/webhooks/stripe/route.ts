import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSubscription, updateSubscriptionStatus } from '@/lib/subscription';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  // 1) Checar variáveis de ambiente
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY não configurada');
    return new NextResponse('Missing STRIPE_SECRET_KEY', { status: 500 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('❌ STRIPE_WEBHOOK_SECRET não configurado');
    return new NextResponse('Missing STRIPE_WEBHOOK_SECRET', { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    console.error('❌ Header stripe-signature ausente');
    return new NextResponse('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  // 2) Validar assinatura do webhook
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error('❌ Erro ao validar webhook:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(`🎯 Evento recebido do Stripe: ${event.type}`);

  // 3) Tratar o evento com try/catch geral
  try {
    // 1️⃣ CHECKOUT SESSION COMPLETED (criar assinatura)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.client_reference_id as string | null;
      const planType = session.metadata?.planType as
        | 'monthly'
        | 'quarterly'
        | 'annual'
        | undefined;
      const stripeCustomerId = session.customer as string | null;
      const stripeSubscriptionId = session.subscription as string | null;

      console.log('📦 Dados do checkout.session.completed:', {
        userId,
        planType,
        stripeCustomerId,
        stripeSubscriptionId,
      });

      if (!userId) {
        console.warn('⚠️ Webhook sem userId (client_reference_id). Ignorando.');
        return NextResponse.json({ received: true });
      }

      if (!planType) {
        console.warn('⚠️ Webhook sem planType em metadata. Ignorando.');
        return NextResponse.json({ received: true });
      }

      if (!stripeSubscriptionId) {
        console.warn('⚠️ Webhook sem stripeSubscriptionId. Ignorando.');
        return NextResponse.json({ received: true });
      }

      // Chamar função que grava a assinatura no Supabase
      await createSubscription(
        userId,
        planType,
        stripeSubscriptionId,
        stripeCustomerId || ''
      );

      console.log('✅ Assinatura criada com sucesso via webhook.');
    }

    // 2️⃣ SUBSCRIPTION UPDATED (atualizar status)
    if (event.type === 'customer.subscription.updated') {
      const sub = event.data.object as Stripe.Subscription;

      console.log('🔄 Atualizando assinatura (updated):', {
        id: sub.id,
        status: sub.status,
      });

      await updateSubscriptionStatus(sub.id, sub.status as any);
      console.log('✅ Status de assinatura atualizado (updated)');
    }

    // 3️⃣ SUBSCRIPTION DELETED (cancelada)
    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;

      console.log('🔄 Atualizando assinatura (deleted):', {
        id: sub.id,
        status: sub.status,
      });

      await updateSubscriptionStatus(sub.id, 'canceled');
      console.log('✅ Status de assinatura atualizado para canceled');
    }
  } catch (error: any) {
    console.error('❌ Erro interno ao processar webhook:', {
      message: error.message,
      stack: error.stack,
    });

    // Ainda assim responder 200 para o Stripe não ficar re-tentando infinitamente
    // (senão você lota seus logs de retries).
    return new NextResponse('Webhook handler error', { status: 200 });
  }

  // 4) Sempre responder 200 se chegamos até aqui
  return NextResponse.json({ received: true });
}
