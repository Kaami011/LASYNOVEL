"use client";

import { useParams, useRouter } from "next/navigation";
import { getBookById, getChapter } from "@/lib/books-data";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  const chapterId = parseInt(params.chapter as string);
  
  const book = getBookById(bookId);
  const chapter = getChapter(bookId, chapterId);
  
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, []);

  async function checkSubscription() {
    try {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsLoggedIn(true);
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();
        
        setHasSubscription(!!subscription);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!book || !chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
        <Header />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Capítulo não encontrado</h1>
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
  const isLocked = chapterId > freeChapters && (!isLoggedIn || !hasSubscription);
  const needsLogin = chapterId <= freeChapters && !isLoggedIn;
  const hasPrevious = chapterId > 1;
  const hasNext = chapterId < book.chapters;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-pink-500 transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link href={`/livro/${book.id}`} className="hover:text-pink-500 transition-colors">
              {book.title}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Capítulo {chapterId}</span>
          </div>

          {/* Header do Capítulo */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-6 h-6 text-pink-500" />
              <span className="text-sm font-bold text-pink-500">
                Capítulo {chapterId} de {book.chapters}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{chapter.title}</h1>
            <p className="text-gray-600">
              {book.title} • {chapter.wordCount.toLocaleString()} palavras
            </p>
          </div>

          {/* Conteúdo do Capítulo */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
            {needsLogin ? (
              <div className="relative">
                {/* Preview com blur */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="relative">
                    <div className="filter blur-sm select-none">
                      {chapter.content.substring(0, 500)}...
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
                  </div>
                </div>

                {/* Login necessário */}
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-6">
                    <Lock className="w-10 h-10 text-pink-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Faça login para ler este capítulo
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Crie uma conta gratuita para ler os primeiros {freeChapters} capítulos de {book.title} e
                    descobrir centenas de outros livros incríveis!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/login"
                      className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Fazer Login / Criar Conta
                    </Link>
                    <Link
                      href={`/livro/${book.id}`}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all duration-300"
                    >
                      Voltar ao Livro
                    </Link>
                  </div>
                </div>
              </div>
            ) : isLocked ? (
              <div className="relative">
                {/* Preview com blur */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="relative">
                    <div className="filter blur-sm select-none">
                      {chapter.content.substring(0, 500)}...
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
                  </div>
                </div>

                {/* Paywall */}
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-6">
                    <Lock className="w-10 h-10 text-pink-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Conteúdo Exclusivo para Assinantes
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Assine agora e tenha acesso ilimitado a todos os capítulos de {book.title} e
                    centenas de outros livros incríveis!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/painel"
                      className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Ver Planos de Assinatura
                    </Link>
                    <Link
                      href={`/livro/${book.id}`}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all duration-300"
                    >
                      Voltar ao Livro
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                  {chapter.content}
                </div>
              </div>
            )}
          </div>

          {/* Navegação entre Capítulos */}
          {!isLocked && !needsLogin && (
            <div className="flex items-center justify-between gap-4">
              {hasPrevious ? (
                <Link
                  href={`/livro/${book.id}/capitulo/${chapterId - 1}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-full font-bold hover:bg-pink-50 hover:text-pink-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Capítulo Anterior</span>
                </Link>
              ) : (
                <div></div>
              )}

              {hasNext ? (
                <Link
                  href={`/livro/${book.id}/capitulo/${chapterId + 1}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Próximo Capítulo</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Você chegou ao fim desta história!</p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-all duration-300"
                  >
                    Descobrir Mais Histórias
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Informações do Livro */}
          <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sobre este livro</h3>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 h-28 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center text-4xl">
                📖
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{book.title}</h4>
                <p className="text-gray-600 mb-2">por {book.author}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{book.description}</p>
                <Link
                  href={`/livro/${book.id}`}
                  className="inline-block text-pink-500 hover:text-pink-600 font-medium text-sm"
                >
                  Ver todos os capítulos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
