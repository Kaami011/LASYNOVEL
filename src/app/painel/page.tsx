"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import BookCard from "@/components/custom/BookCard";
import { Heart, BookOpen, Clock, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const favoriteBooks = [
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
    id: "11",
    title: "A Herdeira Esquecida",
    author: "Karen Silva",
    cover: "",
    rating: 4.9,
    chapters: 130,
    genre: "Drama",
    views: "3.2M",
  },
];

const readingHistory = [
  {
    id: "1",
    title: "Amor Proibido: O Segredo do Bilionário",
    author: "Ana Silva",
    cover: "",
    lastChapter: 45,
    totalChapters: 120,
    progress: 37,
    lastRead: "Há 2 horas",
  },
  {
    id: "4",
    title: "Corações Divididos",
    author: "Diana Oliveira",
    cover: "",
    lastChapter: 78,
    totalChapters: 110,
    progress: 71,
    lastRead: "Ontem",
  },
  {
    id: "8",
    title: "O Príncipe Secreto",
    author: "Helena Martins",
    cover: "",
    lastChapter: 30,
    totalChapters: 60,
    progress: 50,
    lastRead: "Há 3 dias",
  },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"reading" | "favorites" | "profile">("reading");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* User Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-12 h-12" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Maria Silva</h1>
                <p className="text-white/90 mb-4">maria.silva@email.com</p>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <div>
                    <div className="text-2xl font-bold">{favoriteBooks.length}</div>
                    <div className="text-sm text-white/80">Favoritos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{readingHistory.length}</div>
                    <div className="text-sm text-white/80">Lendo</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1.2K</div>
                    <div className="text-sm text-white/80">Capítulos Lidos</div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href="/configuracoes"
                  className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </Link>
                <button className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-8 bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab("reading")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "reading"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Continuar Lendo</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "favorites"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Favoritos</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <User className="w-5 h-5" />
                <span>Perfil</span>
              </div>
            </button>
          </div>

          {/* Content */}
          {activeTab === "reading" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Continuar de onde parou</h2>
              <div className="space-y-4">
                {readingHistory.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-32 aspect-[2/3] sm:aspect-auto bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">📖</div>
                          <div className="text-xs font-medium text-gray-600">{book.title}</div>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                            <p className="text-gray-600">{book.author}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{book.lastRead}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>
                              Capítulo {book.lastChapter} de {book.totalChapters}
                            </span>
                            <span>{book.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Link
                          href={`/livro/${book.id}/capitulo/${book.lastChapter}`}
                          className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                        >
                          Continuar Lendo
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Seus Livros Favoritos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {favoriteBooks.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações do Perfil</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      defaultValue="Maria Silva"
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="maria.silva@email.com"
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Deixe em branco para manter a atual"
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Confirme a nova senha"
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
