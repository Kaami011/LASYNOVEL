import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    // Validar variável de ambiente do Stripe dentro da função
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY não configurada');
      return NextResponse.json(
        { error: 'Configuração do Stripe ausente' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    });

    // Validar sessão do usuário no servidor
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('❌ Usuário não autenticado na API:', authError);
      return NextResponse.json(
        { error: 'Usuário não autenticado. Faça login novamente.' },
        { status: 401 }
      );
    }

    console.log('✅ Usuário autenticado na API:', user.id);

    const { planType, userId, userEmail } = await req.json();

    console.log('📦 Dados recebidos:', { planType, userId, userEmail });

    // Validar que o userId do body corresponde ao usuário autenticado
    if (userId !== user.id) {
      console.error('❌ userId não corresponde ao usuário autenticado');
      return NextResponse.json(
        { error: 'Dados de usuário inválidos' },
        { status: 403 }
      );
    }

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
      client_reference_id: userId, // 🔥 CRÍTICO: Adicionar userId aqui para o webhook
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
