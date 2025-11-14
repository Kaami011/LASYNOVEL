import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription';

/**
 * Rota responsável por criar a sessão de checkout no Stripe.
 *
 * IMPORTANTE:
 * - Não depende mais da autenticação do Supabase no backend.
 * - Recebe `userId` e `userEmail` pelo body da requisição (vindos do painel já logado).
 * - Usa esses dados para vincular a assinatura ao usuário via `client_reference_id` e `metadata`.
 */
export async function POST(req: NextRequest) {
  try {
    console.log('🚀 [API] Iniciando criação de checkout session...');

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ [API] STRIPE_SECRET_KEY não configurada');
      return NextResponse.json(
        { error: 'Configuração do Stripe ausente' },
        { status: 500 },
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });

    const body = (await req.json().catch(() => null)) as {
      planType?: 'monthly' | 'quarterly' | 'annual';
      userId?: string;
      userEmail?: string;
    } | null;

    if (!body?.planType) {
      return NextResponse.json(
        { error: 'Tipo de plano não informado' },
        { status: 400 },
      );
    }

    const { planType, userId, userEmail } = body;

    if (!userId) {
      // Front só deve chamar essa rota se o usuário estiver logado
      return NextResponse.json(
        { error: 'Você não está autenticado. Faça login novamente.' },
        { status: 401 },
      );
    }

    const plan = SUBSCRIPTION_PLANS.find((p) => p.type === planType);
    if (!plan) {
      console.error('❌ [API] Plano inválido:', planType);
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 },
      );
    }

    // URL base para redirecionar depois do pagamento
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      'https://bomromance.com.br';

    console.log('📦 Criando checkout no Stripe para:', {
      userId,
      userEmail,
      planType,
      priceId: plan.stripePriceId,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${baseUrl}/painel?checkout=success`,
      cancel_url: `${baseUrl}/painel?checkout=cancel`,
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail || undefined,
      // 🔥 CRÍTICO: client_reference_id é usado pelo webhook para identificar o usuário
      client_reference_id: userId,
      metadata: {
        userId,
        planType,
        userEmail: userEmail || '',
      },
    });

    console.log('✅ [API] Checkout criado com sucesso:', checkoutSession.id);
    console.log('📋 [API] client_reference_id definido como:', userId);

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error: any) {
    console.error('❌ [API] Erro ao criar checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 },
    );
  }
}
