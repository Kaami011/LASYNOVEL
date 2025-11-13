"use client";

import { Heart, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-purple-50 border-t border-pink-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                NovelBR
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              A maior plataforma brasileira de leitura online de romances. Milhares de histórias de romance, drama e fantasia esperando por você.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-pink-100 transition-colors">
                <Facebook className="w-5 h-5 text-pink-500" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-pink-100 transition-colors">
                <Instagram className="w-5 h-5 text-pink-500" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-pink-100 transition-colors">
                <Twitter className="w-5 h-5 text-pink-500" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explorar" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Explorar
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/novos" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Novos Lançamentos
                </Link>
              </li>
              <li>
                <Link href="/populares" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Mais Populares
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ajuda" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 NovelBR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
