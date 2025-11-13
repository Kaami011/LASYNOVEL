"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, Clock, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data
const featuredBook = {
  id: "1",
  title: "Amor Proibido: O Segredo do Bilionário",
  author: "Ana Silva",
  cover: "",
  rating: 4.8,
  chapters: 120,
  genre: "Romance",
  description: "Uma história envolvente sobre amor, segredos e redenção. Quando Emma conhece o misterioso CEO Marcus, ela não imagina que sua vida mudaria para sempre.",
  views: "2.5M",
};

const trendingBooks = [
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
  {
    id: "6",
    title: "Segredos do Passado",
    author: "Fernanda Lima",
    cover: "",
    rating: 4.5,
    chapters: 90,
    genre: "Mistério",
    views: "1.1M",
  },
];

const newReleases = [
  {
    id: "7",
    title: "Lua de Mel Falsa",
    author: "Gabriel Rocha",
    cover: "",
    rating: 4.4,
    chapters: 45,
    genre: "Romance",
    views: "850K",
  },
  {
    id: "8",
    title: "O Príncipe Secreto",
    author: "Helena Martins",
    cover: "",
    rating: 4.7,
    chapters: 60,
    genre: "Fantasia",
    views: "920K",
  },
  {
    id: "9",
    title: "Casamento por Contrato",
    author: "Igor Ferreira",
    cover: "",
    rating: 4.6,
    chapters: 55,
    genre: "Romance",
    views: "780K",
  },
  {
    id: "10",
    title: "Amor Além do Tempo",
    author: "Julia Alves",
    cover: "",
    rating: 4.8,
    chapters: 70,
    genre: "Fantasia",
    views: "1M",
  },
];

const popularBooks = [
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
  {
    id: "12",
    title: "Vingança Doce",
    author: "Lucas Pereira",
    cover: "",
    rating: 4.7,
    chapters: 105,
    genre: "Drama",
    views: "2.8M",
  },
  {
    id: "13",
    title: "Coração de Gelo",
    author: "Marina Costa",
    cover: "",
    rating: 4.8,
    chapters: 115,
    genre: "Romance",
    views: "2.6M",
  },
  {
    id: "14",
    title: "Paixão Proibida",
    author: "Nicolas Souza",
    cover: "",
    rating: 4.6,
    chapters: 98,
    genre: "Romance",
    views: "2.4M",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      {/* Hero Banner */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center text-white z-10">
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
              <div className="hidden md:flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-[2/3] bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">📖</div>
                    <div className="text-xl font-bold">{featuredBook.title}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Em Alta */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Em Alta</h2>
            </div>
            <Link href="/em-alta" className="text-pink-500 hover:text-pink-600 font-medium flex items-center space-x-1">
              <span>Ver todos</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </section>

      {/* Novos Lançamentos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Novos Lançamentos</h2>
            </div>
            <Link href="/novos" className="text-pink-500 hover:text-pink-600 font-medium flex items-center space-x-1">
              <span>Ver todos</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newReleases.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </section>

      {/* Romances Populares */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Romances Populares</h2>
            </div>
            <Link href="/populares" className="text-pink-500 hover:text-pink-600 font-medium flex items-center space-x-1">
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
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
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
