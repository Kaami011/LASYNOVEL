import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS, getPlanByType } from '@/lib/subscription';

// ============================================
// CONFIGURAÇÃO DO STRIPE
// ============================================

function getStripeInstance(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY não configurada');
  }

  return new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia',
  });
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function getBaseUrl(req: NextRequest): string {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https';
  
  return process.env.NEXT_PUBLIC_APP_URL || 
         origin || 
         (host ? `${protocol}://${host}` : 'http://localhost:3000');
}

async function getOrCreateCustomer(
  stripe: Stripe,
  userEmail: string,
  userId: string
): Promise<Stripe.Customer> {
  // Buscar customer existente
  const existingCustomers = await stripe.customers.list({
    email: userEmail,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    console.log('✅ Customer existente:', existingCustomers.data[0].id);
    return existingCustomers.data[0];
  }

  // Criar novo customer
  const newCustomer = await stripe.customers.create({
    email: userEmail,
    metadata: { userId },
  });

  console.log('✅ Novo customer criado:', newCustomer.id);
  return newCustomer;
}

// ============================================
// HANDLER PRINCIPAL
// ============================================

export async function POST(req: NextRequest) {
  try {
    // 1. Validar configuração
    const stripe = getStripeInstance();

    // 2. Extrair dados da requisição
    const body = await req.json();
    const { planType, userId, userEmail } = body;

    console.log('📦 Requisição recebida:', { planType, userId, userEmail });

    // 3. Validar dados obrigatórios
    if (!planType || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Dados obrigatórios ausentes: planType, userId, userEmail' },
        { status: 400 }
      );
    }

    // 4. Buscar plano
    const plan = getPlanByType(planType);
    
    if (!plan) {
      console.error('❌ Plano não encontrado:', planType);
      return NextResponse.json(
        { error: `Plano inválido: ${planType}` },
        { status: 400 }
      );
    }

    console.log('✅ Plano encontrado:', {
      type: plan.type,
      name: plan.name,
      priceId: plan.stripePriceId,
      price: plan.price
    });

    // 5. Validar Price ID
    if (!plan.stripePriceId.startsWith('price_')) {
      console.error('❌ Price ID inválido:', plan.stripePriceId);
      return NextResponse.json(
        { error: 'Configuração de preço inválida' },
        { status: 500 }
      );
    }

    // 6. Obter ou criar customer
    const customer = await getOrCreateCustomer(stripe, userEmail, userId);

    // 7. Obter URL base
    const baseUrl = getBaseUrl(req);

    console.log('🌐 Base URL:', baseUrl);
    console.log('💳 Criando sessão com Price ID:', plan.stripePriceId);

    // 8. Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/painel?success=true`,
      cancel_url: `${baseUrl}/painel?canceled=true`,
      metadata: {
        userId,
        planType,
      },
      client_reference_id: userId,
    });

    console.log('✅ Sessão criada:', {
      sessionId: session.id,
      url: session.url
    });

    // 9. Retornar resposta
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error: any) {
    console.error('❌ Erro ao criar checkout:', {
      message: error.message,
      type: error.type,
      code: error.code,
    });

    return NextResponse.json(
      {
        error: error.message || 'Erro ao processar pagamento',
        details: error.type || 'unknown_error',
      },
      { status: 500 }
    );
  }
}
