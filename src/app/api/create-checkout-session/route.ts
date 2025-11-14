import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 Iniciando criação de checkout session...');

    // Validar variável de ambiente do Stripe
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

    // 🔥 CRÍTICO: Validar sessão do usuário NO SERVIDOR (fonte única da verdade)
    const supabase = createRouteHandlerClient({ cookies });
    
    console.log('🔍 Verificando sessão do usuário no servidor...');
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Erro ao obter sessão:', sessionError);
      return NextResponse.json(
        { error: 'Erro ao validar sessão. Tente fazer login novamente.' },
        { status: 401 }
      );
    }

    if (!session) {
      console.error('❌ Nenhuma sessão encontrada no servidor');
      return NextResponse.json(
        { error: 'Você não está autenticado. Por favor, faça login novamente.' },
        { status: 401 }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('❌ Usuário não autenticado na API:', authError);
      return NextResponse.json(
        { error: 'Usuário não autenticado. Faça login novamente.' },
        { status: 401 }
      );
    }

    console.log('✅ Usuário autenticado na API:', {
      userId: user.id,
      email: user.email
    });

    // 🔥 IMPORTANTE: Usar dados do servidor, NÃO do cliente
    const userId = user.id;
    const userEmail = user.email;

    if (!userEmail) {
      console.error('❌ Email do usuário não encontrado');
      return NextResponse.json(
        { error: 'Email do usuário não encontrado' },
        { status: 400 }
      );
    }

    // Pegar planType do body (único dado confiável do cliente)
    const { planType } = await req.json();

    console.log('📦 Dados do checkout:', { planType, userId, userEmail });

    if (!planType) {
      return NextResponse.json(
        { error: 'Tipo de plano não especificado' },
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
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/painel?success=true`,
      cancel_url: `${baseUrl}/painel?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId: userId,
        planType: planType,
      },
    });

    console.log('✅ Sessão de checkout criada com sucesso:', {
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
