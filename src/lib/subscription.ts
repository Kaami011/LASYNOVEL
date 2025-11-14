import { supabase, isSupabaseConfigured } from './supabase';

export interface SubscriptionPlan {
  type: 'monthly' | 'quarterly' | 'annual';
  name: string;
  price: number;
  pricePerMonth: number;
  duration: number; // em dias
  savings?: string;
  featured?: boolean;
  stripePriceId: string;
  stripeProductId: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    type: 'monthly',
    name: 'Mensal',
    price: 14.97,
    pricePerMonth: 14.97,
    duration: 30,
    featured: true,
    stripeProductId: 'prod_TQ52IR5rTLr29e',
    stripePriceId: 'price_1STMZz1OX1wPZ0uVLc3q8qMO',
  },
  {
    type: 'quarterly',
    name: 'Trimestral',
    price: 38.91,
    pricePerMonth: 12.97,
    duration: 90,
    savings: 'Economize 13%',
    stripeProductId: 'prod_TQ52IR5rTLr29e',
    stripePriceId: 'price_1STEsP1OX1wPZ0uV5QX6oT6Z',
  },
  {
    type: 'annual',
    name: 'Anual',
    price: 131.64,
    pricePerMonth: 10.97,
    duration: 365,
    savings: 'Economize 27%',
    stripeProductId: 'prod_TQ52IR5rTLr29e',
    stripePriceId: 'price_1STEsv1OX1wPZ0uVB79Q3UPr',
  },
];

export async function checkUserSubscription(userId: string) {
  if (!isSupabaseConfigured() || !supabase) {
    console.error('❌ Supabase não configurado ao verificar assinatura');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString())
      .order('end_date', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('❌ Erro ao verificar assinatura:', error);
      return null;
    }

    if (data) {
      console.log('✅ Assinatura ativa encontrada:', {
        userId,
        planType: data.plan_type,
        endDate: data.end_date
      });
    }

    return data;
  } catch (error) {
    console.error('❌ Erro ao verificar assinatura:', error);
    return null;
  }
}

export async function createSubscription(
  userId: string,
  planType: 'monthly' | 'quarterly' | 'annual',
  stripeSubscriptionId: string,
  stripeCustomerId: string
) {
  if (!isSupabaseConfigured() || !supabase) {
    const error = new Error('Supabase não configurado');
    console.error('❌❌❌ ERRO CRÍTICO:', error.message);
    throw error;
  }

  const plan = SUBSCRIPTION_PLANS.find(p => p.type === planType);
  if (!plan) {
    const error = new Error('Plano inválido');
    console.error('❌❌❌ ERRO CRÍTICO:', error.message, { planType });
    throw error;
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

  console.log('🔄 Tentando criar assinatura no banco:', {
    userId,
    planType,
    stripeSubscriptionId,
    stripeCustomerId,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    amount: plan.price
  });

  try {
    // 🔥 PRIMEIRO: Verificar se já existe assinatura com esse stripe_subscription_id
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .single();

    if (existingSubscription) {
      console.log('⚠️ Assinatura já existe, atualizando para garantir que está ativa:', existingSubscription.id);
      
      // Atualizar para garantir que está ativa
      const { data: updatedData, error: updateError } = await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          end_date: endDate.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', stripeSubscriptionId)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Erro ao atualizar assinatura existente:', updateError);
        throw updateError;
      }

      console.log('✅✅✅ ASSINATURA ATUALIZADA COM SUCESSO:', updatedData);
      return updatedData;
    }

    // 🔥 SEGUNDO: Criar nova assinatura
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_type: planType,
        status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        amount: plan.price,
        stripe_subscription_id: stripeSubscriptionId,
        stripe_customer_id: stripeCustomerId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌❌❌ ERRO ao inserir assinatura:', error);
      console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('✅✅✅ ASSINATURA CRIADA COM SUCESSO:', data);
    return data;
  } catch (error: any) {
    console.error('❌❌❌ EXCEÇÃO ao criar assinatura:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: 'active' | 'canceled' | 'past_due'
) {
  if (!isSupabaseConfigured() || !supabase) {
    const error = new Error('Supabase não configurado');
    console.error('❌❌❌ ERRO CRÍTICO:', error.message);
    throw error;
  }

  console.log('🔄 Atualizando status da assinatura:', {
    stripeSubscriptionId,
    newStatus: status,
    timestamp: new Date().toISOString()
  });

  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .select()
      .single();

    if (error) {
      console.error('❌❌❌ ERRO ao atualizar status:', error);
      console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
      throw error;
    }

    if (!data) {
      console.warn('⚠️ Nenhuma assinatura encontrada com stripe_subscription_id:', stripeSubscriptionId);
      return null;
    }

    console.log('✅✅✅ STATUS ATUALIZADO COM SUCESSO:', data);
    return data;
  } catch (error: any) {
    console.error('❌❌❌ EXCEÇÃO ao atualizar status:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

export async function hasAccessToChapter(userId: string | undefined, chapterNumber: number): Promise<boolean> {
  // Capítulos 1, 2 e 3 são sempre gratuitos
  if (chapterNumber <= 3) return true;

  // Se não estiver logado, não tem acesso
  if (!userId) return false;

  // Verificar se tem assinatura ativa
  const subscription = await checkUserSubscription(userId);
  return subscription !== null;
}

export function getFreeChaptersCount(): number {
  return 3;
}
