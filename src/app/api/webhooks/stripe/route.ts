import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSubscription, updateSubscriptionStatus } from '@/lib/subscription';

export async function POST(req: NextRequest) {
  // Validar variáveis de ambiente dentro da função
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY não configurada');
    return NextResponse.json(
      { error: 'Configuração do servidor incompleta' },
      { status: 500 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn('⚠️ STRIPE_WEBHOOK_SECRET não configurada - webhooks não funcionarão em produção');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('❌ Assinatura do webhook ausente');
    return NextResponse.json(
      { error: 'Assinatura do webhook ausente' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('❌ Erro ao verificar webhook:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log('📨 Webhook recebido:', event.type);
  console.log('📋 Dados completos do evento:', JSON.stringify(event.data.object, null, 2));

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Checkout completado:', session.id);
        console.log('📦 Session completa:', JSON.stringify(session, null, 2));

        // Extrair dados do metadata
        const userId = session.metadata?.userId;
        const planType = session.metadata?.planType as 'monthly' | 'quarterly' | 'annual';

        if (!userId || !planType) {
          console.error('❌ Metadata ausente no checkout:', session.metadata);
          console.error('🔍 Session ID:', session.id);
          console.error('🔍 Customer:', session.customer);
          break;
        }

        // Buscar subscription do Stripe
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (!subscriptionId || !customerId) {
          console.error('❌ SubscriptionId ou CustomerId ausente');
          console.error('🔍 Session:', {
            id: session.id,
            subscription: subscriptionId,
            customer: customerId,
            payment_status: session.payment_status
          });
          break;
        }

        // 🔥 CRÍTICO: Criar assinatura no banco de dados COM RETRY
        let retries = 3;
        let subscriptionCreated = false;
        
        while (retries > 0 && !subscriptionCreated) {
          try {
            await createSubscription(userId, planType, subscriptionId, customerId);
            subscriptionCreated = true;
            console.log('✅✅✅ ASSINATURA CRIADA COM SUCESSO NO BANCO:', {
              userId,
              planType,
              subscriptionId,
              customerId,
              timestamp: new Date().toISOString()
            });
          } catch (error: any) {
            retries--;
            console.error(`❌ Tentativa falhou (${3 - retries}/3):`, error.message);
            if (retries > 0) {
              console.log(`🔄 Tentando novamente em 2 segundos... (${retries} tentativas restantes)`);
              await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
              console.error('❌❌❌ FALHA CRÍTICA: Não foi possível criar assinatura após 3 tentativas');
              throw error;
            }
          }
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('✅ Pagamento bem-sucedido:', invoice.id);
        console.log('💰 Invoice completa:', JSON.stringify(invoice, null, 2));

        if (invoice.subscription) {
          // 🔥 GARANTIR que assinatura está ativa após pagamento
          let retries = 3;
          let statusUpdated = false;
          
          while (retries > 0 && !statusUpdated) {
            try {
              await updateSubscriptionStatus(invoice.subscription as string, 'active');
              statusUpdated = true;
              console.log('✅✅✅ ASSINATURA REATIVADA/CONFIRMADA:', {
                subscriptionId: invoice.subscription,
                invoiceId: invoice.id,
                amount: invoice.amount_paid / 100,
                timestamp: new Date().toISOString()
              });
            } catch (error: any) {
              retries--;
              console.error(`❌ Tentativa falhou (${3 - retries}/3):`, error.message);
              if (retries > 0) {
                console.log(`🔄 Tentando novamente em 2 segundos... (${retries} tentativas restantes)`);
                await new Promise(resolve => setTimeout(resolve, 2000));
              } else {
                console.error('❌❌❌ FALHA CRÍTICA: Não foi possível atualizar status após 3 tentativas');
                throw error;
              }
            }
          }
        }

        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🆕 Nova assinatura criada no Stripe:', subscription.id);
        console.log('📦 Subscription completa:', JSON.stringify(subscription, null, 2));
        
        // Log detalhado para debug
        console.log('🔍 Detalhes da subscription:', {
          id: subscription.id,
          customer: subscription.customer,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          items: subscription.items.data.map(item => ({
            price: item.price.id,
            product: item.price.product
          }))
        });

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🔄 Assinatura atualizada:', subscription.id);
        console.log('📦 Status:', subscription.status);

        const status = subscription.status === 'active' ? 'active' : 
                      subscription.status === 'past_due' ? 'past_due' : 'canceled';

        // 🔥 GARANTIR atualização com retry
        let retries = 3;
        let statusUpdated = false;
        
        while (retries > 0 && !statusUpdated) {
          try {
            await updateSubscriptionStatus(subscription.id, status);
            statusUpdated = true;
            console.log('✅✅✅ STATUS ATUALIZADO NO BANCO:', {
              subscriptionId: subscription.id,
              newStatus: status,
              timestamp: new Date().toISOString()
            });
          } catch (error: any) {
            retries--;
            console.error(`❌ Tentativa falhou (${3 - retries}/3):`, error.message);
            if (retries > 0) {
              console.log(`🔄 Tentando novamente em 2 segundos... (${retries} tentativas restantes)`);
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Assinatura cancelada:', subscription.id);

        // 🔥 GARANTIR cancelamento com retry
        let retries = 3;
        let statusUpdated = false;
        
        while (retries > 0 && !statusUpdated) {
          try {
            await updateSubscriptionStatus(subscription.id, 'canceled');
            statusUpdated = true;
            console.log('✅✅✅ ASSINATURA CANCELADA NO BANCO:', {
              subscriptionId: subscription.id,
              timestamp: new Date().toISOString()
            });
          } catch (error: any) {
            retries--;
            console.error(`❌ Tentativa falhou (${3 - retries}/3):`, error.message);
            if (retries > 0) {
              console.log(`🔄 Tentando novamente em 2 segundos... (${retries} tentativas restantes)`);
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('⚠️ Pagamento falhou:', invoice.id);

        if (invoice.subscription) {
          await updateSubscriptionStatus(invoice.subscription as string, 'past_due');
          console.log('✅ Assinatura marcada como past_due');
        }

        break;
      }

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌❌❌ ERRO CRÍTICO ao processar webhook:', error);
    console.error('Stack trace:', error.stack);
    
    // Retornar 200 mesmo com erro para evitar retry infinito do Stripe
    // mas logar tudo para investigação
    return NextResponse.json(
      { 
        received: true, 
        error: error.message,
        note: 'Erro logado mas retornando 200 para evitar retry'
      },
      { status: 200 }
    );
  }
}

// Adicionar handler para outros métodos HTTP (retorna 405)
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido. Use POST para webhooks do Stripe.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Método não permitido. Use POST para webhooks do Stripe.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Método não permitido. Use POST para webhooks do Stripe.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Método não permitido. Use POST para webhooks do Stripe.' },
    { status: 405 }
  );
}
