"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { Filter, Grid, List } from "lucide-react";
import { useState } from "react";

const allBooks = [
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
];

const genres = ["Todos", "Romance", "Drama", "Fantasia", "Mistério", "Aventura"];

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("popular");

  const filteredBooks =
    selectedGenre === "Todos"
      ? allBooks
      : allBooks.filter((book) => book.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Explorar Romances</h1>
            <p className="text-gray-600">Descubra milhares de histórias incríveis</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Genre Filter */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Gênero</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedGenre === genre
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                          : "bg-pink-50 text-gray-700 hover:bg-pink-100"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="lg:ml-6">
                <label className="block font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                >
                  <option value="popular">Mais Popular</option>
                  <option value="rating">Melhor Avaliado</option>
                  <option value="recent">Mais Recente</option>
                  <option value="chapters">Mais Capítulos</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando <span className="font-bold text-gray-900">{filteredBooks.length}</span>{" "}
              {filteredBooks.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300">
              Carregar Mais
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
