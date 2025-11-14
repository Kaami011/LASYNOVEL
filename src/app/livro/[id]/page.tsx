"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { Heart, Star, Clock, Eye, Share2, BookOpen, Lock, Crown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { checkUserSubscription, getFreeChaptersCount } from "@/lib/subscription";

// Mock data
const bookData = {
  id: "1",
  title: "Amor Proibido: O Segredo do Bilionário",
  author: "Ana Silva",
  cover: "",
  rating: 4.8,
  totalRatings: 12500,
  chapters: 120,
  genre: "Romance",
  tags: ["Romance", "Drama", "CEO", "Amor Proibido"],
  views: "2.5M",
  status: "Completo",
  lastUpdate: "Há 2 dias",
  description: `Emma sempre foi uma mulher independente e focada em sua carreira. Trabalhando como assistente executiva em uma das maiores empresas do país, ela nunca imaginou que sua vida mudaria completamente ao conhecer Marcus Blackwood, o misterioso e sedutor CEO.

Marcus é conhecido por sua frieza nos negócios e por manter sua vida pessoal em absoluto sigilo. Mas quando Emma entra em sua vida, algo desperta nele - um sentimento que ele jurou nunca mais experimentar.

Entre reuniões corporativas e jantares de negócios, uma química inegável surge entre eles. Mas segredos do passado de Marcus ameaçam destruir qualquer chance de felicidade. Emma precisará decidir se está disposta a arriscar seu coração por um amor que pode ser impossível.

Uma história envolvente sobre amor, redenção e a coragem de seguir o coração, mesmo quando tudo parece estar contra você.`,
};

const chapters = Array.from({ length: 120 }, (_, i) => ({
  number: i + 1,
  title: `Capítulo ${i + 1}: ${
    i === 0 ? "O Encontro" :
    i === 1 ? "Primeiras Impressões" :
    i === 2 ? "Tensão no Ar" :
    i === 10 ? "O Beijo" :
    i === 50 ? "Revelações" :
    i === 100 ? "A Verdade" :
    i === 119 ? "Para Sempre" :
    `Parte ${i + 1}`
  }`,
  date: "Há 3 dias",
  views: Math.floor(Math.random() * 50000) + 10000,
}));

const recommendedBooks = [
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
    id: "3",
    title: "Paixão Inesperada",
    author: "Carlos Mendes",
    cover: "",
    rating: 4.7,
    chapters: 80,
    genre: "Drama",
    views: "1.5M",
  },
  {
    id: "4",
    title: "Corações Divididos",
    author: "Diana Oliveira",
    cover: "",
    rating: 4.6,
    chapters: 110,
    genre: "Romance",
    views: "1.3M",
  },
  {
    id: "5",
    title: "Amor em Paris",
    author: "Eduardo Santos",
    cover: "",
    rating: 4.8,
    chapters: 75,
    genre: "Romance",
    views: "1.2M",
  },
];

export default function BookPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [hasSubscription, setHasSubscription] = useState(false);

  const freeChaptersCount = getFreeChaptersCount();

  useEffect(() => {
    setMounted(true);
    checkUserAccess();
  }, []);

  const checkUserAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const subscription = await checkUserSubscription(user.id);
        setHasSubscription(subscription !== null);
      }
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
    }
  };

  const displayedChapters = showAllChapters ? chapters : chapters.slice(0, 10);

  const isChapterLocked = (chapterNumber: number) => {
    return chapterNumber > freeChaptersCount && !hasSubscription;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Subscription Banner (if not subscribed) */}
          {!hasSubscription && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <Crown className="w-12 h-12" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      Primeiros {freeChaptersCount} capítulos grátis!
                    </h3>
                    <p className="text-white/90">
                      Assine para ter acesso ilimitado a partir de R$ 10,97/mês
                    </p>
                  </div>
                </div>
                <Link
                  href="/painel"
                  className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  Ver Planos
                </Link>
              </div>
            </div>
          )}

          {/* Book Info Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
            <div className="grid md:grid-cols-3 gap-8 p-6 md:p-10">
              {/* Book Cover */}
              <div className="md:col-span-1">
                <div className="relative aspect-[2/3] bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-8xl mb-4">📖</div>
                      <div className="text-lg font-medium px-4">{bookData.title}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                    {bookData.status}
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="md:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {bookData.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">por {bookData.author}</p>
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 bg-pink-50 hover:bg-pink-100 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{bookData.rating}</span>
                    <span className="text-gray-500">
                      ({mounted ? bookData.totalRatings.toLocaleString('pt-BR') : bookData.totalRatings} avaliações)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{bookData.chapters} capítulos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{bookData.views} leituras</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{bookData.lastUpdate}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {bookData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Sinopse</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {bookData.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/livro/${bookData.id}/capitulo/1`}
                    className="flex-1 py-4 bg-pink-500 text-white text-center rounded-full font-bold hover:shadow-lg transition-all duration-300"
                  >
                    Começar a Ler
                  </Link>
                  <button className="px-8 py-4 bg-pink-50 text-pink-600 rounded-full font-bold hover:bg-pink-100 transition-colors flex items-center justify-center space-x-2">
                    <Share2 className="w-5 h-5" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters List */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
            <div className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista de Capítulos</h2>
              <div className="space-y-2">
                {displayedChapters.map((chapter) => {
                  const locked = isChapterLocked(chapter.number);
                  
                  return (
                    <Link
                      key={chapter.number}
                      href={`/livro/${bookData.id}/capitulo/${chapter.number}`}
                      className={`block p-4 rounded-xl transition-colors group ${
                        locked 
                          ? 'bg-gray-50 hover:bg-gray-100' 
                          : 'bg-pink-50 hover:bg-pink-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 flex items-center space-x-3">
                          {locked ? (
                            <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-pink-500 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className={`font-bold transition-colors ${
                                locked 
                                  ? 'text-gray-500' 
                                  : 'text-gray-900 group-hover:text-pink-600'
                              }`}>
                                {chapter.title}
                              </h3>
                              {locked && (
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
                                  Premium
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <span>{chapter.date}</span>
                              <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{mounted ? chapter.views.toLocaleString('pt-BR') : chapter.views}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        {locked ? (
                          <Crown className="w-5 h-5 text-purple-500" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              {!showAllChapters && chapters.length > 10 && (
                <button
                  onClick={() => setShowAllChapters(true)}
                  className="w-full mt-6 py-3 bg-pink-500 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  Ver Todos os {chapters.length} Capítulos
                </button>
              )}
            </div>
          </div>

          {/* Recommended Books */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Você Também Pode Gostar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {recommendedBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
