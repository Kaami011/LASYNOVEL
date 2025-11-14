"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Upload,
  LayoutDashboard,
  FolderOpen,
  LogOut,
} from "lucide-react";

const CATEGORIAS = [
  "Romance",
  "Drama",
  "Fantasia",
  "Ficção Científica",
  "Mistério",
  "Terror",
  "Aventura",
  "Comédia",
  "Histórico",
  "Suspense",
];

export default function NovoLivro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    sinopse: "",
    capa_url: "",
    categoria: "Romance",
    status: "em_andamento",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { error } = await supabase.from("livros").insert({
        titulo: formData.titulo,
        sinopse: formData.sinopse,
        capa_url: formData.capa_url,
        categoria: formData.categoria,
        status: formData.status,
        autor_id: user.id,
        visualizacoes: 0,
        curtidas: 0,
        avaliacao_media: 0,
        total_avaliacoes: 0,
        total_capitulos: 0,
      });

      if (error) throw error;

      router.push("/admin/dashboard/livros");
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      alert("Erro ao criar livro");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin</h1>
              <p className="text-xs text-gray-500">NovelBR</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/dashboard/livros"
              className="flex items-center space-x-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-lg font-medium"
            >
              <BookOpen className="w-5 h-5" />
              <span>Livros</span>
            </Link>
            <Link
              href="/admin/dashboard/categorias"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              <FolderOpen className="w-5 h-5" />
              <span>Categorias</span>
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="absolute bottom-6 left-6 right-6 flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/admin/dashboard/livros"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Adicionar Novo Livro</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Digite o título do livro"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sinopse *
                </label>
                <textarea
                  value={formData.sinopse}
                  onChange={(e) => setFormData({ ...formData, sinopse: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  placeholder="Escreva uma sinopse envolvente..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Capa
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="url"
                    value={formData.capa_url}
                    onChange={(e) => setFormData({ ...formData, capa_url: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://exemplo.com/capa.jpg"
                  />
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Cole a URL de uma imagem ou deixe em branco para usar o ícone padrão
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="em_andamento">Em Andamento</option>
                    <option value="completo">Completo</option>
                    <option value="pausado">Pausado</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-pink-500 text-white rounded-lg font-bold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Criando..." : "Criar Livro"}
                </button>
                <Link
                  href="/admin/dashboard/livros"
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors text-center"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
