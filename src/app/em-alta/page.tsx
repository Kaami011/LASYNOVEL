"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { TrendingUp } from "lucide-react";
import { booksData } from "@/lib/books-data";

export default function EmAltaPage() {
  // Ordenar livros por views (mais lidos)
  const trendingBooks = [...booksData]
    .sort((a, b) => {
      const viewsA = parseFloat(a.views.replace(/[KM]/g, '')) * (a.views.includes('M') ? 1000 : 1);
      const viewsB = parseFloat(b.views.replace(/[KM]/g, '')) * (b.views.includes('M') ? 1000 : 1);
      return viewsB - viewsA;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Em Alta
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Os romances mais lidos do momento
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-pink-500 mb-1">
                {trendingBooks.length}
              </div>
              <div className="text-sm text-gray-600">Livros em Alta</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-pink-500 mb-1">
                {trendingBooks.reduce((acc, book) => acc + book.chapters, 0)}
              </div>
              <div className="text-sm text-gray-600">Capítulos Totais</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-pink-500 mb-1">
                {(trendingBooks.reduce((acc, book) => acc + book.rating, 0) / trendingBooks.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-pink-500 mb-1">
                150K+
              </div>
              <div className="text-sm text-gray-600">Leituras Totais</div>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {trendingBooks.map((book, index) => (
              <div key={book.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -left-2 z-10 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                )}
                <BookCard {...book} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
