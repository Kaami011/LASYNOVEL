import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSubscription, updateSubscriptionStatus } from '@/lib/subscription';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
  });

  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('❌ Erro ao validar webhook:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(`🎯 Evento recebido: ${event.type}`);

  // -------------------------------
  // 1️⃣ CHECKOUT COMPLETED
  // -------------------------------
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.client_reference_id;
    const planType = session.metadata?.planType;
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;

    console.log('📦 Dados do checkout:', {
      userId,
      planType,
      stripeCustomerId,
      stripeSubscriptionId,
    });

    if (userId && planType && stripeSubscriptionId) {
      await createSubscription(
        userId,
        planType,
        stripeSubscriptionId,
        stripeCustomerId
      );
    }
  }

  // -------------------------------
  // 2️⃣ SUBSCRIPTION UPDATED
  // -------------------------------
  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object;
    await updateSubscriptionStatus(sub.id, sub.status as any);
  }

  // -------------------------------
  // 3️⃣ SUBSCRIPTION DELETED
  // -------------------------------
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    await updateSubscriptionStatus(sub.id, 'canceled');
  }

  return NextResponse.json({ received: true });
}
