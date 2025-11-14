import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription';

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

    // 🔥 CRÍTICO: Pegar userId do client_reference_id (prioridade) ou metadata
    const userId = session.client_reference_id || session.metadata?.userId;
    const planType = session.metadata?.planType as 'monthly' | 'quarterly' | 'annual';
    const userEmail = session.metadata?.userEmail || session.customer_email;
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;

    console.log('📦 Dados completos do checkout:', {
      sessionId: session.id,
      userId,
      planType,
      userEmail,
      stripeCustomerId,
      stripeSubscriptionId,
      client_reference_id: session.client_reference_id,
      metadata: session.metadata,
    });

    if (!userId) {
      console.error('❌ ERRO CRÍTICO: userId está NULL!');
      console.error('📋 Session completa:', JSON.stringify(session, null, 2));
      return NextResponse.json({ 
        received: true, 
        error: 'userId não encontrado' 
      });
    }

    if (!planType) {
      console.error('❌ ERRO: planType não encontrado!');
      return NextResponse.json({ 
        received: true, 
        error: 'planType não encontrado' 
      });
    }

    if (!stripeSubscriptionId) {
      console.error('❌ ERRO: stripeSubscriptionId não encontrado!');
      return NextResponse.json({ 
        received: true, 
        error: 'stripeSubscriptionId não encontrado' 
      });
    }

    // 🔥 BUSCAR O VALOR DO PLANO
    const plan = SUBSCRIPTION_PLANS.find(p => p.type === planType);
    if (!plan) {
      console.error('❌ ERRO: Plano não encontrado para tipo:', planType);
      return NextResponse.json({ 
        received: true, 
        error: 'Plano não encontrado' 
      });
    }

    // Calcular datas de início e fim
    const start = new Date();
    const end = new Date();

    if (planType === 'monthly') end.setMonth(end.getMonth() + 1);
    if (planType === 'quarterly') end.setMonth(end.getMonth() + 3);
    if (planType === 'annual') end.setFullYear(end.getFullYear() + 1);

    console.log('💾 Inserindo assinatura no banco:', {
      user_id: userId,
      plan_type: planType,
      status: 'active',
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      amount: plan.price,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
    });

    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_type: planType,
        status: 'active',
        start_date: start.toISOString(),
        end_date: end.toISOString(),
        amount: plan.price,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
      })
      .select();

    if (error) {
      console.error('❌ Erro ao inserir assinatura:', error);
      console.error('📋 Detalhes do erro:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Assinatura criada no banco com sucesso!');
      console.log('📋 Dados inseridos:', data);
    }
  }

  // 2️⃣ UPDATED
  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object;

    console.log('🔄 Atualizando assinatura:', sub.id);

    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        status: sub.status,
        current_period_start: sub.current_period_start,
        current_period_end: sub.current_period_end,
      })
      .eq('stripe_subscription_id', sub.id);

    if (error) {
      console.error('❌ Erro ao atualizar assinatura:', error);
    } else {
      console.log('✅ Assinatura atualizada no banco:', sub.id);
    }
  }

  // 3️⃣ DELETED
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;

    console.log('🗑️ Cancelando assinatura:', sub.id);

    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('stripe_subscription_id', sub.id);

    if (error) {
      console.error('❌ Erro ao cancelar assinatura:', error);
    } else {
      console.log('✅ Assinatura cancelada:', sub.id);
    }
  }

  return NextResponse.json({ received: true });
}
