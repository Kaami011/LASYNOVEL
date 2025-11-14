import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const PRICE_IDS = {
  monthly: 'price_1STMZz1OX1wPZ0uVLc3q8qMO',
  quarterly: 'price_1STOMK1OX1wPZ0uVf6yZojha',
  annual: 'price_1STOMV1OX1wPZ0uVp3uKGSsP',
};

export async function POST(request: NextRequest) {
  try {
    const { planType, userId } = await request.json();

    if (!planType || !userId) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    const priceId = PRICE_IDS[planType as keyof typeof PRICE_IDS];

    if (!priceId) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/painel?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/painel?canceled=true`,
      metadata: {
        userId,
        planType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
