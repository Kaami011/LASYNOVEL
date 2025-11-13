"use client";

import { Search, User, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-pink-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              NovelBR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Início
            </Link>
            <Link href="/explorar" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Explorar
            </Link>
            <Link href="/categorias" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Categorias
            </Link>
            <Link href="/novos" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Novos
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar romances..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/favoritos" className="p-2 hover:bg-pink-50 rounded-full transition-colors">
              <Heart className="w-6 h-6 text-gray-700" />
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium"
            >
              Entrar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-pink-50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-pink-100">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar romances..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2">
                Início
              </Link>
              <Link href="/explorar" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2">
                Explorar
              </Link>
              <Link href="/categorias" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2">
                Categorias
              </Link>
              <Link href="/novos" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2">
                Novos
              </Link>
              <Link href="/favoritos" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Favoritos
              </Link>
              <Link
                href="/login"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium text-center"
              >
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
