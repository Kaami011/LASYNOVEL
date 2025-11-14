"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { Sparkles } from "lucide-react";
import { booksData } from "@/lib/books-data";

export default function NovosPage() {
  // Pegar os últimos livros (invertendo a ordem para mostrar os mais recentes primeiro)
  const newBooks = [...booksData].reverse();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Novos Lançamentos
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Os romances mais recentes da plataforma
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                {newBooks.length}
              </div>
              <div className="text-sm text-gray-600">Novos Livros</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                {newBooks.slice(0, 5).reduce((acc, book) => acc + book.chapters, 0)}
              </div>
              <div className="text-sm text-gray-600">Novos Capítulos</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                {(newBooks.slice(0, 5).reduce((acc, book) => acc + book.rating, 0) / 5).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                Diário
              </div>
              <div className="text-sm text-gray-600">Atualizações</div>
            </div>
          </div>

          {/* New Badge Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-12 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Últimos Adicionados</h2>
            </div>
            <p className="text-white/90 mb-4">
              Confira os romances mais recentes que acabaram de chegar na plataforma. 
              Novos capítulos e histórias são adicionados diariamente!
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <div className="px-3 py-1 bg-white/20 rounded-full">
                Atualizado hoje
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-full">
                {newBooks.length} livros disponíveis
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {newBooks.map((book) => (
              <div key={book.id} className="relative group">
                <div className="absolute -top-2 -right-2 z-10 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                  NOVO
                </div>
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
