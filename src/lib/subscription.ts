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

// ✅ IDs CORRETOS DO STRIPE (LIVE MODE)
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    type: 'monthly',
    name: 'Mensal',
    price: 14.97,
    pricePerMonth: 14.97,
    duration: 30,
    featured: true,
    stripeProductId: 'prod_TQ52IR5rTLr29e',
    stripePriceId: 'price_1STEs11OX1wPZ0uVVcOiqdJK', // ✅ ID CORRETO
  },
  {
    type: 'quarterly',
    name: 'Trimestral',
    price: 38.91,
    pricePerMonth: 12.97,
    duration: 90,
    savings: 'Economize 13%',
    stripeProductId: 'prod_TQ52IR5rTLr29e',
    stripePriceId: 'price_1STEsP1OX1wPZ0uV5QX6oT6Z', // ✅ ID CORRETO
  },
  {
    type: 'annual',
    name: 'Anual',
    price: 131.64,
    pricePerMonth: 10.97,
    duration: 365,
    savings: 'Economize 27%',
    stripeProductId: 'prod_TQ52IR5rTLr29e',
    stripePriceId: 'price_1STEsv1OX1wPZ0uVB79Q3UPr', // ✅ ID CORRETO
  },
];

export async function checkUserSubscription(userId: string) {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('⚠️ Supabase não configurado');
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
      .limit(1);

    if (error) {
      console.error('❌ Erro ao verificar assinatura:', error);
      return null;
    }

    // Retornar o primeiro resultado ou null
    return data && data.length > 0 ? data[0] : null;
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
    throw new Error('Supabase não configurado');
  }

  const plan = SUBSCRIPTION_PLANS.find(p => p.type === planType);
  if (!plan) {
    throw new Error(`Plano inválido: ${planType}`);
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

  console.log('📝 Inserindo assinatura no banco:', {
    user_id: userId,
    plan_type: planType,
    status: 'active',
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    amount: plan.price,
    stripe_subscription_id: stripeSubscriptionId,
    stripe_customer_id: stripeCustomerId,
  });

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
    })
    .select();

  if (error) {
    console.error('❌ Erro ao inserir assinatura:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error('Nenhum dado retornado após inserção');
  }

  console.log('✅ Assinatura inserida com sucesso:', data[0]);
  return data[0];
}

export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: 'active' | 'canceled' | 'past_due'
) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase não configurado');
  }

  console.log('🔄 Atualizando status da assinatura:', {
    stripe_subscription_id: stripeSubscriptionId,
    new_status: status
  });

  const { data, error } = await supabase
    .from('subscriptions')
    .update({ status })
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .select();

  if (error) {
    console.error('❌ Erro ao atualizar status:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    console.warn('⚠️ Nenhuma assinatura encontrada com stripe_subscription_id:', stripeSubscriptionId);
    throw new Error(`Assinatura não encontrada: ${stripeSubscriptionId}`);
  }

  console.log('✅ Status atualizado com sucesso:', data[0]);
  return data[0];
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
