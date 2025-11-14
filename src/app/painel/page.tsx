"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import SubscriptionModal from "@/components/custom/SubscriptionModal";
import { Heart, BookOpen, Clock, User, Settings, LogOut, Crown, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { checkUserSubscription, SUBSCRIPTION_PLANS } from "@/lib/subscription";

const favoriteBooks = [
  {
    id: "1",
    title: "Amor Proibido: O Segredo do Bilionário",
    author: "Ana Silva",
    cover: "",
    rating: 4.8,
    chapters: 120,
    genre: "Romance",
    views: "2.5M",
  },
  {
    id: "2",
    title: "Destino Entrelaçado",
    author: "Beatriz Costa",
    cover: "",
    rating: 4.9,
    chapters: 95,
    genre: "Romance",
    views: "1.8M",
  },
  {
    id: "11",
    title: "A Herdeira Esquecida",
    author: "Karen Silva",
    cover: "",
    rating: 4.9,
    chapters: 130,
    genre: "Drama",
    views: "3.2M",
  },
];

const readingHistory = [
  {
    id: "1",
    title: "Amor Proibido: O Segredo do Bilionário",
    author: "Ana Silva",
    cover: "",
    lastChapter: 45,
    totalChapters: 120,
    progress: 37,
    lastRead: "Há 2 horas",
  },
  {
    id: "4",
    title: "Corações Divididos",
    author: "Diana Oliveira",
    cover: "",
    lastChapter: 78,
    totalChapters: 110,
    progress: 71,
    lastRead: "Ontem",
  },
  {
    id: "8",
    title: "O Príncipe Secreto",
    author: "Helena Martins",
    cover: "",
    lastChapter: 30,
    totalChapters: 60,
    progress: 50,
    lastRead: "Há 3 dias",
  },
];

function UserDashboardContent() {
  const [activeTab, setActiveTab] = useState<"reading" | "favorites" | "profile" | "subscription">("reading");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    checkAuth();
    
    // Verificar se voltou do checkout com sucesso
    const success = searchParams.get('success');
    if (success === 'true') {
      // Recarregar assinatura após sucesso
      setTimeout(() => {
        checkAuth();
      }, 2000);
    }
  }, []);

  const checkAuth = async () => {
    if (isRedirecting) return;
    
    // Verificar se Supabase está configurado
    if (!supabase) {
      console.error("Supabase não está configurado");
      setIsRedirecting(true);
      router.replace("/login");
      return;
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        setIsRedirecting(true);
        router.replace("/login");
        return;
      }

      setUser(user);
      
      // Verificar assinatura
      const userSubscription = await checkUserSubscription(user.id);
      setSubscription(userSubscription);
      
      setLoading(false);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      if (!isRedirecting) {
        setIsRedirecting(true);
        router.replace("/login");
      }
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    
    await supabase.auth.signOut();
    router.replace("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* User Header */}
          <div className={`${subscription ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-pink-500'} rounded-3xl p-8 mb-8 text-white shadow-2xl`}>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {subscription ? <Crown className="w-12 h-12" /> : <User className="w-12 h-12" />}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl font-bold">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'}
                  </h1>
                  {subscription && (
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold flex items-center space-x-1">
                      <Crown className="w-4 h-4" />
                      <span>Premium</span>
                    </span>
                  )}
                </div>
                <p className="text-white/90 mb-4">{user?.email}</p>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <div>
                    <div className="text-2xl font-bold">{favoriteBooks.length}</div>
                    <div className="text-sm text-white/80">Favoritos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{readingHistory.length}</div>
                    <div className="text-sm text-white/80">Lendo</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1.2K</div>
                    <div className="text-sm text-white/80">Capítulos Lidos</div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href="/configuracoes"
                  className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Banner (if not subscribed) */}
          {!subscription && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <Crown className="w-12 h-12" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">Desbloqueie Todos os Capítulos</h3>
                    <p className="text-white/90">Acesso ilimitado a partir de R$ 10,97/mês</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  Ver Planos
                </button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-2 mb-8 bg-white rounded-2xl p-2 shadow-lg overflow-x-auto">
            <button
              onClick={() => setActiveTab("reading")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "reading"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Continuar Lendo</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "favorites"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Favoritos</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "subscription"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Crown className="w-5 h-5" />
                <span>Assinatura</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "profile"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <User className="w-5 h-5" />
                <span>Perfil</span>
              </div>
            </button>
          </div>

          {/* Content */}
          {activeTab === "reading" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Continuar de onde parou</h2>
              <div className="space-y-4">
                {readingHistory.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-32 aspect-[2/3] sm:aspect-auto bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">📖</div>
                          <div className="text-xs font-medium text-gray-600">{book.title}</div>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                            <p className="text-gray-600">{book.author}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{book.lastRead}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>
                              Capítulo {book.lastChapter} de {book.totalChapters}
                            </span>
                            <span>{book.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-pink-500 transition-all duration-300"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Link
                          href={`/livro/${book.id}/capitulo/${book.lastChapter}`}
                          className="inline-block px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 hover:shadow-lg transition-all duration-300"
                        >
                          Continuar Lendo
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Seus Livros Favoritos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {favoriteBooks.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="max-w-4xl mx-auto">
              {subscription ? (
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Assinatura Premium Ativa</h2>
                    <p className="text-gray-600">Você tem acesso ilimitado a todos os livros e capítulos</p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Plano Atual</p>
                        <p className="text-xl font-bold text-gray-900">
                          {subscription.plan_type === 'monthly' ? 'Mensal' : 
                           subscription.plan_type === 'quarterly' ? 'Trimestral' : 'Anual'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Próxima Renovação</p>
                        <p className="text-xl font-bold text-gray-900">
                          {new Date(subscription.end_date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Acesso ilimitado a todos os livros</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Todos os capítulos desbloqueados</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Leitura offline</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Sem anúncios</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                    Gerenciar Assinatura
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha Seu Plano</h2>
                    <p className="text-gray-600">Desbloqueie acesso ilimitado a todos os livros</p>
                  </div>

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

                        <button
                          onClick={() => setShowSubscriptionModal(true)}
                          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                            plan.featured
                              ? 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          Assinar Agora
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações do Perfil</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Deixe em branco para manter a atual"
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Confirme a nova senha"
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 hover:shadow-lg transition-all duration-300"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Subscription Modal */}
      {user && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          userId={user.id}
          userEmail={user.email || ''}
        />
      )}
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <UserDashboardContent />
    </Suspense>
  );
}
