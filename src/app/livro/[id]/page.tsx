"use client";

import { useParams } from "next/navigation";
import { getBookById } from "@/lib/books-data";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import Link from "next/link";
import { Star, BookOpen, Eye, Clock, ArrowLeft, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;
  const book = getBookById(bookId);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, []);

  async function checkSubscription() {
    try {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();
        
        setHasSubscription(!!subscription);
      }
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
        <Header />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Livro não encontrado</h1>
            <Link href="/" className="text-pink-500 hover:text-pink-600 font-medium">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const freeChapters = 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Botão Voltar */}
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-pink-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>

          {/* Header do Livro */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="md:flex">
              {/* Capa */}
              <div className="md:w-1/3 bg-gradient-to-br from-pink-400 to-pink-600 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">📖</div>
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm font-medium">{book.ageRating}</span>
                  </div>
                </div>
              </div>

              {/* Informações */}
              <div className="md:w-2/3 p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-6">por {book.author}</p>

                {/* Estatísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <Star className="w-6 h-6 text-pink-500 mx-auto mb-2 fill-pink-500" />
                    <div className="text-2xl font-bold text-gray-900">{book.rating}</div>
                    <div className="text-sm text-gray-600">Avaliação</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <BookOpen className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{book.chapters}</div>
                    <div className="text-sm text-gray-600">Capítulos</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <Eye className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{book.views}</div>
                    <div className="text-sm text-gray-600">Leituras</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <Clock className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{book.genre}</div>
                    <div className="text-sm text-gray-600">Gênero</div>
                  </div>
                </div>

                {/* Botão Começar a Ler */}
                <Link
                  href={`/livro/${book.id}/capitulo/1`}
                  className="w-full block text-center px-8 py-4 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Começar a Ler
                </Link>
              </div>
            </div>
          </div>

          {/* Sinopse */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sinopse</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{book.synopsis}</p>
          </div>

          {/* Lista de Capítulos */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Capítulos</h2>
              {!hasSubscription && (
                <div className="text-sm text-gray-600">
                  {freeChapters} capítulos gratuitos
                </div>
              )}
            </div>

            <div className="space-y-3">
              {book.fullStory.map((chapter) => {
                const isFree = chapter.id <= freeChapters;
                const isLocked = !isFree && !hasSubscription;

                return (
                  <Link
                    key={chapter.id}
                    href={isLocked ? "#" : `/livro/${book.id}/capitulo/${chapter.id}`}
                    className={`block p-4 rounded-xl transition-all duration-300 ${
                      isLocked
                        ? "bg-gray-100 cursor-not-allowed opacity-60"
                        : "bg-pink-50 hover:bg-pink-100 hover:shadow-md"
                    }`}
                    onClick={(e) => {
                      if (isLocked) {
                        e.preventDefault();
                        alert("Assine para desbloquear todos os capítulos!");
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-bold text-pink-500">
                            Capítulo {chapter.id}
                          </span>
                          {isFree && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                              Grátis
                            </span>
                          )}
                          {isLocked && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium flex items-center space-x-1">
                              <Lock className="w-3 h-3" />
                              <span>Bloqueado</span>
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{chapter.title}</h3>
                        <p className="text-sm text-gray-600">
                          {chapter.wordCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} palavras
                        </p>
                      </div>
                      <div className="ml-4">
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <BookOpen className="w-6 h-6 text-pink-500" />
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA Assinatura */}
            {!hasSubscription && (
              <div className="mt-8 p-6 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl text-white text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Desbloqueie Todos os Capítulos
                </h3>
                <p className="mb-4 text-white/90">
                  Assine agora e tenha acesso ilimitado a todos os livros e capítulos!
                </p>
                <Link
                  href="/painel"
                  className="inline-block px-8 py-3 bg-white text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-all duration-300 shadow-lg"
                >
                  Ver Planos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
