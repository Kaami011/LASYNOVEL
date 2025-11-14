import { supabase } from './supabase';

export interface SubscriptionPlan {
  type: 'monthly' | 'quarterly' | 'annual';
  name: string;
  price: number;
  pricePerMonth: number;
  duration: number; // em dias
  stripePriceId: string;
  savings?: string;
  featured?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    type: 'quarterly',
    name: 'Trimestral',
    price: 38.91,
    pricePerMonth: 12.97,
    duration: 90,
    stripePriceId: 'price_1STOMK1OX1wPZ0uVf6yZojha',
    savings: 'Economize 13%',
  },
  {
    type: 'monthly',
    name: 'Mensal',
    price: 14.97,
    pricePerMonth: 14.97,
    duration: 30,
    stripePriceId: 'price_1STMZz1OX1wPZ0uVLc3q8qMO',
    featured: true,
  },
  {
    type: 'annual',
    name: 'Anual',
    price: 131.64,
    pricePerMonth: 10.97,
    duration: 365,
    stripePriceId: 'price_1STOMV1OX1wPZ0uVp3uKGSsP',
    savings: 'Economize 27%',
  },
];

export function getPlanByType(planType: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(p => p.type === planType);
}

export async function checkUserSubscription(userId: string) {
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
      console.error('Erro ao verificar assinatura:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return null;
  }
}

export async function createSubscription(
  userId: string,
  planType: 'monthly' | 'quarterly' | 'annual',
  stripeSubscriptionId: string,
  stripeCustomerId: string
) {
  const plan = SUBSCRIPTION_PLANS.find(p => p.type === planType);
  if (!plan) throw new Error('Plano inválido');

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

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
    .select()
    .single();

  if (error) throw error;
  
  console.log('✅ Assinatura criada no banco:', data);
  return data;
}

export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: 'active' | 'canceled' | 'past_due'
) {
  const { data, error } = await supabase
    .from('subscriptions')
    .update({ status })
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .select()
    .single();

  if (error) {
    console.error('❌ Erro ao atualizar status da assinatura:', error);
    throw error;
  }

  console.log('✅ Status da assinatura atualizado:', data);
  return data;
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
