"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import SubscriptionModal from "@/components/custom/SubscriptionModal";
import { ChevronLeft, ChevronRight, BookOpen, Lock, Crown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { hasAccessToChapter, getFreeChaptersCount } from "@/lib/subscription";

// Mock data do capítulo
const getChapterContent = (chapterNumber: number) => ({
  number: chapterNumber,
  title: `Capítulo ${chapterNumber}: ${
    chapterNumber === 1 ? "O Encontro" :
    chapterNumber === 2 ? "Primeiras Impressões" :
    chapterNumber === 3 ? "Tensão no Ar" :
    chapterNumber === 4 ? "O Convite" :
    chapterNumber === 5 ? "Jantar Inesperado" :
    `Parte ${chapterNumber}`
  }`,
  content: `Este é o conteúdo do capítulo ${chapterNumber}.

Emma acordou cedo naquela manhã, com um misto de ansiedade e expectativa. Hoje seria seu primeiro dia trabalhando diretamente com Marcus Blackwood, o CEO mais misterioso e cobiçado da cidade.

Ao entrar no escritório, ela não podia imaginar que sua vida estava prestes a mudar completamente. Marcus estava de pé, olhando pela janela panorâmica que dava vista para toda a cidade.

"Bom dia, Srta. Thompson", disse ele sem se virar, sua voz profunda ecoando pela sala.

Emma sentiu um arrepio percorrer sua espinha. Como ele sabia que era ela?

"Bom dia, Sr. Blackwood", respondeu, tentando manter a voz firme.

Ele finalmente se virou, e seus olhos azuis penetrantes encontraram os dela. Por um momento, o tempo pareceu parar.

"Espero que esteja preparada. Não aceito nada menos que perfeição", disse ele, com um leve sorriso no canto dos lábios.

Emma engoliu em seco. Este seria um dia muito longo...

[O capítulo continua com mais 2000 palavras de desenvolvimento da história, diálogos envolventes e momentos de tensão romântica entre os personagens principais.]

A tarde passou rapidamente, com Emma correndo de um lado para o outro, organizando reuniões, preparando relatórios e tentando acompanhar o ritmo frenético de Marcus. Ele era exigente, mas justo. E havia algo nele que a intrigava profundamente.

Quando o relógio marcou 18h, Emma estava exausta. Mas antes que pudesse sair, Marcus a chamou em seu escritório.

"Srta. Thompson, preciso que me acompanhe em um jantar de negócios hoje à noite", disse ele, sem tirar os olhos dos documentos à sua frente.

Emma hesitou. "Eu... não estava preparada para isso."

Marcus finalmente olhou para ela, e havia algo diferente em seus olhos. "Considere isso parte do trabalho. Passo para buscá-la às 20h."

Não era um pedido. Era uma ordem. E Emma sabia que sua vida estava prestes a ficar muito mais complicada...`,
  date: "Há 3 dias",
  views: Math.floor(Math.random() * 50000) + 10000,
});

const bookData = {
  id: "1",
  title: "Amor Proibido: O Segredo do Bilionário",
  author: "Ana Silva",
  totalChapters: 120,
};

export default function ChapterPage({
  params,
}: {
  params: { id: string; chapter: string };
}) {
  const [user, setUser] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const router = useRouter();

  const chapterNumber = parseInt(params.chapter);
  const chapter = getChapterContent(chapterNumber);
  const freeChaptersCount = getFreeChaptersCount();

  useEffect(() => {
    checkAccess();
  }, [chapterNumber]);

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const access = await hasAccessToChapter(user?.id, chapterNumber);
      setHasAccess(access);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando capítulo...</p>
        </div>
      </div>
    );
  }

  // Se não tem acesso, mostrar paywall
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
        <Header />

        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href={`/livro/${params.id}`}
                className="text-pink-600 hover:text-pink-700 font-medium flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar para o livro</span>
              </Link>
            </div>

            {/* Locked Content */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Capítulo Bloqueado</h1>
                <p className="text-white/90 text-lg">
                  Os primeiros {freeChaptersCount} capítulos são gratuitos
                </p>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{chapter.title}</h2>
                  <p className="text-gray-600">
                    Para continuar lendo, escolha um plano de assinatura
                  </p>
                </div>

                {/* Preview do conteúdo bloqueado */}
                <div className="relative mb-8">
                  <div className="prose max-w-none text-gray-700 blur-sm select-none">
                    <p>{chapter.content.substring(0, 300)}...</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
                  <Crown className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Desbloqueie Todos os Capítulos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Acesso ilimitado a partir de R$ 10,97/mês
                  </p>
                  {user ? (
                    <button
                      onClick={() => setShowSubscriptionModal(true)}
                      className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 hover:shadow-lg transition-all duration-300"
                    >
                      Ver Planos de Assinatura
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="inline-block px-8 py-4 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 hover:shadow-lg transition-all duration-300"
                    >
                      Fazer Login para Assinar
                    </Link>
                  )}
                </div>

                {/* Benefícios */}
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <h4 className="font-bold text-gray-900 mb-1">Acesso Total</h4>
                    <p className="text-sm text-gray-600">
                      Todos os livros e capítulos
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h4 className="font-bold text-gray-900 mb-1">Sem Limites</h4>
                    <p className="text-sm text-gray-600">
                      Leia quanto quiser
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">💝</div>
                    <h4 className="font-bold text-gray-900 mb-1">Cancele Quando Quiser</h4>
                    <p className="text-sm text-gray-600">
                      Sem compromisso
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
            currentChapter={chapterNumber}
          />
        )}
      </div>
    );
  }

  // Conteúdo desbloqueado
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href={`/livro/${params.id}`}
              className="text-pink-600 hover:text-pink-700 font-medium flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar para o livro</span>
            </Link>
          </div>

          {/* Chapter Content */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
                  <p className="text-white/90">{bookData.title}</p>
                  <p className="text-white/80 text-sm">por {bookData.author}</p>
                </div>
                <BookOpen className="w-12 h-12 text-white/80" />
              </div>
              <div className="flex items-center space-x-6 text-sm text-white/80">
                <span>{chapter.date}</span>
                <span>{chapter.views.toLocaleString('pt-BR')} visualizações</span>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-800 leading-relaxed text-lg">
                  {chapter.content}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {chapterNumber > 1 ? (
              <Link
                href={`/livro/${params.id}/capitulo/${chapterNumber - 1}`}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-pink-600 rounded-full font-bold hover:shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Capítulo Anterior</span>
              </Link>
            ) : (
              <div></div>
            )}

            {chapterNumber < bookData.totalChapters && (
              <Link
                href={`/livro/${params.id}/capitulo/${chapterNumber + 1}`}
                className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300"
              >
                <span>Próximo Capítulo</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
