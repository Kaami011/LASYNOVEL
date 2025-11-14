"use client";

import { X, Check, Sparkles, Loader2 } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/subscription";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userEmail: string;
  currentChapter?: number;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  userId,
  userEmail,
  currentChapter,
}: SubscriptionModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPlan = async (planType: "monthly" | "quarterly" | "annual") => {
    setLoading(true);
    setSelectedPlan(planType);
    setError(null);

    try {
      // 1. Buscar usuário logado
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("⚠️ Usuário não logado:", authError);
        setError("Você precisa estar logado para assinar.");
        setLoading(false);
        setSelectedPlan(null);
        return;
      }

      const userIdFromAuth = user.id;
      const userEmailFromAuth = user.email;

      console.log("👤 Usuário no checkout:", { userId: userIdFromAuth, userEmail: userEmailFromAuth, planType });

      // 2. Chamar a API com TODOS os dados
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          userId: userIdFromAuth,
          userEmail: userEmailFromAuth,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error("❌ Erro ao criar sessão:", err);
        throw new Error(err.error || "Erro ao iniciar o checkout. Tente novamente.");
      }

      const data = await response.json();
      console.log("✅ Sessão Stripe criada:", data);

      if (data.url) {
        window.location.href = data.url; // redireciona pro Stripe
      } else {
        throw new Error("URL de checkout não encontrada");
      }
    } catch (err: any) {
      console.error("❌ Erro inesperado no handleSelectPlan:", err);
      setError(err.message || "Erro inesperado ao iniciar o checkout.");
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10 disabled:opacity-50"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-2" />
            <h2 className="text-3xl font-bold">Desbloqueie Todos os Capítulos</h2>
          </div>
          {currentChapter && (
            <p className="text-white/90 text-lg">
              Continue lendo a partir do Capítulo {currentChapter}
            </p>
          )}
          <p className="text-white/80 mt-2">
            Acesso ilimitado a todos os livros e capítulos da plataforma
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
              <p className="text-lg font-bold text-gray-900">Redirecionando para pagamento...</p>
              <p className="text-sm text-gray-600 mt-2">Aguarde um momento</p>
            </div>
          </div>
        )}

        {/* Plans */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.type}
                className={`relative rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl ${
                  plan.featured
                    ? 'border-pink-500 bg-pink-50 transform scale-105'
                    : 'border-gray-200 bg-white hover:border-pink-300'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                      MAIS POPULAR
                    </span>
                  </div>
                )}

                {plan.savings && !plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full shadow-lg">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    R$ {plan.pricePerMonth.toFixed(2).replace('.', ',')}/mês
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Acesso ilimitado a todos os livros</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Todos os capítulos desbloqueados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Leitura offline</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Sem anúncios</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Cancele quando quiser</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.type)}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
                    plan.featured
                      ? 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {loading && selectedPlan === plan.type ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    'Assinar Agora'
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Por que assinar?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">📚</div>
                <p className="text-sm text-gray-700 font-medium">
                  Milhares de histórias para explorar
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-sm text-gray-700 font-medium">
                  Novos capítulos toda semana
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💝</div>
                <p className="text-sm text-gray-700 font-medium">
                  Apoie seus autores favoritos
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Pagamento seguro via Stripe • Cancele a qualquer momento • Suporte 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
