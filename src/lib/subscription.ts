import { supabase, isSupabaseConfigured } from './supabase';

// ============================================
// TIPOS E INTERFACES
// ============================================

export interface SubscriptionPlan {
  type: 'monthly' | 'quarterly' | 'annual';
  name: string;
  price: number;
  pricePerMonth: number;
  duration: number;
  savings?: string;
  featured?: boolean;
  stripePriceId: string;
  stripeProductId: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'monthly' | 'quarterly' | 'annual';
  status: 'active' | 'canceled' | 'past_due';
  start_date: string;
  end_date: string;
  amount: number;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  created_at: string;
}

// ============================================
// CONFIGURAÇÃO DOS PLANOS
// ============================================

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

// ============================================
// FUNÇÕES DE CONSULTA
// ============================================

/**
 * Verifica se o usuário tem uma assinatura ativa
 */
export async function checkUserSubscription(userId: string): Promise<Subscription | null> {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('⚠️ Supabase não configurado');
    return null;
  }

  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gte('end_date', now)
      .order('end_date', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Nenhum registro encontrado
        return null;
      }
      console.error('❌ Erro ao verificar assinatura:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('❌ Erro inesperado ao verificar assinatura:', error);
    return null;
  }
}

/**
 * Busca plano por tipo
 */
export function getPlanByType(planType: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(p => p.type === planType);
}

// ============================================
// FUNÇÕES DE MANIPULAÇÃO
// ============================================

/**
 * Cria uma nova assinatura no banco de dados
 */
export async function createSubscription(
  userId: string,
  planType: 'monthly' | 'quarterly' | 'annual',
  stripeSubscriptionId: string,
  stripeCustomerId: string
): Promise<Subscription> {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase não configurado');
  }

  const plan = getPlanByType(planType);
  if (!plan) {
    throw new Error(`Plano inválido: ${planType}`);
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

  const subscriptionData = {
    user_id: userId,
    plan_type: planType,
    status: 'active' as const,
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    amount: plan.price,
    stripe_subscription_id: stripeSubscriptionId,
    stripe_customer_id: stripeCustomerId,
  };

  console.log('📝 Criando assinatura:', subscriptionData);

  const { data, error } = await supabase
    .from('subscriptions')
    .insert(subscriptionData)
    .select()
    .single();

  if (error) {
    console.error('❌ Erro ao criar assinatura:', error);
    throw new Error(`Falha ao criar assinatura: ${error.message}`);
  }

  console.log('✅ Assinatura criada com sucesso:', data.id);
  return data;
}

/**
 * Atualiza o status de uma assinatura
 */
export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: 'active' | 'canceled' | 'past_due'
): Promise<Subscription> {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase não configurado');
  }

  console.log('🔄 Atualizando status:', { stripeSubscriptionId, status });

  const { data, error } = await supabase
    .from('subscriptions')
    .update({ status })
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .select()
    .single();

  if (error) {
    console.error('❌ Erro ao atualizar status:', error);
    throw new Error(`Falha ao atualizar status: ${error.message}`);
  }

  console.log('✅ Status atualizado com sucesso');
  return data;
}

// ============================================
// FUNÇÕES DE ACESSO
// ============================================

/**
 * Verifica se o usuário tem acesso a um capítulo específico
 */
export async function hasAccessToChapter(
  userId: string | undefined,
  chapterNumber: number
): Promise<boolean> {
  // Capítulos 1, 2 e 3 são sempre gratuitos
  if (chapterNumber <= 3) return true;

  // Se não estiver logado, não tem acesso
  if (!userId) return false;

  // Verificar se tem assinatura ativa
  const subscription = await checkUserSubscription(userId);
  return subscription !== null;
}

/**
 * Retorna o número de capítulos gratuitos
 */
export function getFreeChaptersCount(): number {
  return 3;
}
