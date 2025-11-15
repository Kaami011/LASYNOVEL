"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { Filter, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { booksData, getAllGenres } from "@/lib/books-data";

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("popular");
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);

  // Obter todos os gêneros disponíveis
  const genres = useMemo(() => getAllGenres(), []);

  // Filtrar livros por gênero selecionado
  const filteredBooks = useMemo(() => {
    let books = selectedGenre === "Todos" 
      ? [...booksData] 
      : booksData.filter((book) => book.genre === selectedGenre);

    // Ordenar livros
    switch (sortBy) {
      case "popular":
        books.sort((a, b) => {
          const viewsA = parseFloat(a.views.replace(/[KM]/g, "")) * (a.views.includes("M") ? 1000 : a.views.includes("K") ? 1 : 1);
          const viewsB = parseFloat(b.views.replace(/[KM]/g, "")) * (b.views.includes("M") ? 1000 : b.views.includes("K") ? 1 : 1);
          return viewsB - viewsA;
        });
        break;
      case "rating":
        books.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
        books.reverse();
        break;
      case "chapters":
        books.sort((a, b) => b.chapters - a.chapters);
        break;
    }

    return books;
  }, [selectedGenre, sortBy]);

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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 gap-6">
              {/* Genre Filter - Dropdown Menu */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Gênero</span>
                </div>
                
                {/* Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsGenreMenuOpen(!isGenreMenuOpen)}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-3"
                  >
                    <span>{selectedGenre}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isGenreMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isGenreMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-y-auto">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => {
                            setSelectedGenre(genre);
                            setIsGenreMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-pink-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                            selectedGenre === genre
                              ? "bg-pink-100 text-pink-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Genre Display */}
                {selectedGenre !== "Todos" && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Filtrando por:</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {selectedGenre}
                    </span>
                    <button
                      onClick={() => setSelectedGenre("Todos")}
                      className="text-sm text-gray-500 hover:text-pink-600 underline"
                    >
                      Limpar
                    </button>
                  </div>
                )}
              </div>

              {/* Sort By */}
              <div className="lg:ml-6">
                <label className="block font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all bg-white"
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
              {selectedGenre !== "Todos" && (
                <span className="text-pink-600 font-medium"> em {selectedGenre}</span>
              )}
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum livro encontrado nesta categoria.</p>
              <button
                onClick={() => setSelectedGenre("Todos")}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all"
              >
                Ver Todos os Livros
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
