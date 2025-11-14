import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

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

  // 1️⃣ CHECKOUT COMPLETED
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
      const start = new Date();
      const end = new Date();

      if (planType === 'monthly') end.setMonth(end.getMonth() + 1);
      if (planType === 'quarterly') end.setMonth(end.getMonth() + 3);
      if (planType === 'annual') end.setFullYear(end.getFullYear() + 1);

      const { error } = await supabaseAdmin
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_type: planType,
          status: 'active',
          start_date: start.toISOString(),
          end_date: end.toISOString(),
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
        });

      if (error) console.error('❌ Erro ao inserir assinatura:', error);
      else console.log('✅ Assinatura criada no banco com sucesso');
    }
  }

  // 2️⃣ UPDATED
  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object;

    await supabaseAdmin
      .from('subscriptions')
      .update({
        status: sub.status,
        current_period_start: sub.current_period_start,
        current_period_end: sub.current_period_end,
      })
      .eq('stripe_subscription_id', sub.id);

    console.log('🔄 Assinatura atualizada no banco:', sub.id);
  }

  // 3️⃣ DELETED
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;

    await supabaseAdmin
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('stripe_subscription_id', sub.id);

    console.log('❌ Assinatura cancelada:', sub.id);
  }

  return NextResponse.json({ received: true });
}
