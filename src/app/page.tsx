"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { ChevronRight, TrendingUp, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { booksData } from "@/lib/books-data";

export default function Home() {
  // Pegar livro em destaque (primeiro da lista)
  const featuredBook = booksData[0];
  
  // Pegar top 3 em alta (livros com mais views)
  const trendingBooks = [...booksData]
    .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
    .slice(0, 3);
  
  // Pegar lançamentos (últimos 5 livros)
  const newReleases = booksData.slice(-5);
  
  // Pegar populares (4 livros com melhor rating)
  const popularBooks = [...booksData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      {/* Hero Banner - Full Width */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-pink-500 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col justify-center text-white z-10 max-w-4xl">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit mb-4">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-sm font-medium">Mais Lido da Semana</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {featuredBook.title}
                </h1>
                <p className="text-lg mb-2 text-white/90">por {featuredBook.author}</p>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {featuredBook.description}
                </p>
                <div className="flex items-center space-x-6 mb-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    <span className="font-bold">{featuredBook.rating}</span>
                  </div>
                  <span>{featuredBook.chapters} capítulos</span>
                  <span>{featuredBook.views} leituras</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/livro/${featuredBook.id}`}
                    className="px-8 py-3 bg-white text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                  >
                    Começar a Ler
                  </Link>
                  <Link
                    href={`/livro/${featuredBook.id}`}
                    className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/30 transition-all duration-300 text-center border-2 border-white/50"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Em Alta + Lançamentos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Em Alta - Top 3 */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Em Alta</h2>
              </div>
              
              {/* Top 3 Layout */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* 2º Lugar - Esquerda */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      2
                    </div>
                  </div>
                  <Link href={`/livro/${trendingBooks[1].id}`} className="group">
                    <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <div className="aspect-[2/3] bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg mb-2 flex items-center justify-center text-4xl">
                        📖
                      </div>
                      <h3 className="font-bold text-xs text-gray-900 line-clamp-2 mb-1">{trendingBooks[1].title}</h3>
                      <p className="text-xs text-gray-600 mb-1">{trendingBooks[1].author}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{trendingBooks[1].rating}</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* 1º Lugar - Centro (Maior) */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                      1
                    </div>
                  </div>
                  <Link href={`/livro/${trendingBooks[0].id}`} className="group">
                    <div className="bg-white rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                      <div className="aspect-[2/3] bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg mb-2 flex items-center justify-center text-5xl">
                        📖
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">{trendingBooks[0].title}</h3>
                      <p className="text-xs text-gray-600 mb-1">{trendingBooks[0].author}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">{trendingBooks[0].rating}</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* 3º Lugar - Direita */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      3
                    </div>
                  </div>
                  <Link href={`/livro/${trendingBooks[2].id}`} className="group">
                    <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <div className="aspect-[2/3] bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg mb-2 flex items-center justify-center text-4xl">
                        📖
                      </div>
                      <h3 className="font-bold text-xs text-gray-900 line-clamp-2 mb-1">{trendingBooks[2].title}</h3>
                      <p className="text-xs text-gray-600 mb-1">{trendingBooks[2].author}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{trendingBooks[2].rating}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Lançamentos - Lista Vertical */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Lançamentos</h2>
              </div>
              
              <div className="space-y-3">
                {newReleases.map((book, index) => (
                  <Link key={book.id} href={`/livro/${book.id}`} className="group">
                    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-shrink-0 w-16 h-24 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center text-3xl">
                        📖
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{book.rating}</span>
                          </div>
                          <span>{book.chapters} caps</span>
                          <span>{book.views}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Romances Populares */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Romances Populares</h2>
            </div>
            <Link href="/explorar" className="text-pink-500 hover:text-pink-600 font-medium flex items-center space-x-1">
              <span>Ver todos</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {popularBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-pink-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Junte-se a milhões de leitores e descubra histórias incríveis todos os dias.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-white text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
