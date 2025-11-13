"use client";

import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  chapters: number;
  genre: string;
  views?: string;
}

export default function BookCard({
  id,
  title,
  author,
  cover,
  rating,
  chapters,
  genre,
  views,
}: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/livro/${id}`}>
        <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-2">📖</div>
              <div className="text-sm font-medium">{title}</div>
            </div>
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium rounded-full">
            {genre}
          </div>
        </div>
      </Link>

      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-600"
          }`}
        />
      </button>

      <div className="p-4">
        <Link href={`/livro/${id}`}>
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-pink-500 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-3">{author}</p>

        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-700">{rating}</span>
          </div>
          <span className="text-gray-500">{chapters} capítulos</span>
        </div>

        {views && (
          <div className="text-xs text-gray-500 mb-3">
            {views} visualizações
          </div>
        )}

        <Link
          href={`/livro/${id}`}
          className="block w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center rounded-full font-medium hover:shadow-lg transition-all duration-300"
        >
          Ler Agora
        </Link>
      </div>
    </div>
  );
}
