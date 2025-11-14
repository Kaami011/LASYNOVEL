import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Erro na verificação do webhook:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Processar evento de checkout completado
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const planType = session.metadata?.planType;

      if (!userId || !planType) {
        console.error('Metadata incompleto no webhook');
        return NextResponse.json({ error: 'Metadata incompleto' }, { status: 400 });
      }

      // Calcular data de término baseado no plano
      const startDate = new Date();
      const endDate = new Date();

      switch (planType) {
        case 'monthly':
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case 'quarterly':
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case 'annual':
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
      }

      // Criar ou atualizar assinatura no Supabase
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_type: planType,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          stripe_subscription_id: session.subscription as string,
          stripe_customer_id: session.customer as string,
        });

      if (error) {
        console.error('Erro ao salvar assinatura:', error);
        return NextResponse.json(
          { error: 'Erro ao salvar assinatura' },
          { status: 500 }
        );
      }

      console.log(`Assinatura ${planType} ativada para usuário ${userId}`);
    }

    // Processar cancelamento de assinatura
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id);

      if (error) {
        console.error('Erro ao cancelar assinatura:', error);
      }
    }

    // Processar atualização de assinatura
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          status: subscription.status === 'active' ? 'active' : 'canceled',
          end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id);

      if (error) {
        console.error('Erro ao atualizar assinatura:', error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
