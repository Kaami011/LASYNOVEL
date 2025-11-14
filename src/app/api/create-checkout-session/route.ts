import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription';

// Validar variável de ambiente do Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não configurada nas variáveis de ambiente');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { planType, userId, userEmail } = await req.json();

    console.log('📦 Dados recebidos:', { planType, userId, userEmail });

    if (!planType || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Buscar o plano correto com o stripePriceId
    const plan = SUBSCRIPTION_PLANS.find(p => p.type === planType);
    
    if (!plan || !plan.stripePriceId) {
      console.error('❌ Plano não encontrado ou sem stripePriceId:', planType);
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    console.log('✅ Plano encontrado:', {
      type: plan.type,
      name: plan.name,
      priceId: plan.stripePriceId
    });

    // Criar ou recuperar customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log('✅ Customer existente encontrado:', customer.id);
    } else {
      customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId,
        },
      });
      console.log('✅ Novo customer criado:', customer.id);
    }

    // Obter URL base da aplicação de forma segura
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'https';
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                    origin || 
                    (host ? `${protocol}://${host}` : 'http://localhost:3000');

    console.log('🌐 Base URL:', baseUrl);

    // Criar sessão de checkout usando o stripePriceId correto
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId, // Usando o ID correto do plano
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/painel?success=true`,
      cancel_url: `${baseUrl}/painel?canceled=true`,
      metadata: {
        userId: userId,
        planType: planType,
      },
    });

    console.log('✅ Sessão de checkout criada:', {
      sessionId: session.id,
      url: session.url
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Erro ao criar checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
