"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  BookOpen,
  FolderOpen,
  Plus,
  LayoutDashboard,
  LogOut,
  Tag,
} from "lucide-react";

const CATEGORIAS_PADRAO = [
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
  "Ação",
  "Thriller",
  "Paranormal",
  "Distopia",
  "Young Adult",
];

interface CategoriaStats {
  categoria: string;
  total: number;
}

export default function AdminCategorias() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CategoriaStats[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("eh_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.eh_admin) {
      router.push("/admin/login");
    }
  };

  const loadStats = async () => {
    try {
      const { data: livros } = await supabase
        .from("livros")
        .select("categoria");

      const categoriaCount: { [key: string]: number } = {};
      
      livros?.forEach((livro) => {
        categoriaCount[livro.categoria] = (categoriaCount[livro.categoria] || 0) + 1;
      });

      const statsArray = Object.entries(categoriaCount).map(([categoria, total]) => ({
        categoria,
        total,
      }));

      // Adicionar categorias padrão que não têm livros
      CATEGORIAS_PADRAO.forEach((cat) => {
        if (!statsArray.find((s) => s.categoria === cat)) {
          statsArray.push({ categoria: cat, total: 0 });
        }
      });

      statsArray.sort((a, b) => b.total - a.total);
      setStats(statsArray);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategoria = () => {
    if (!novaCategoria.trim()) return;
    
    if (!stats.find((s) => s.categoria === novaCategoria)) {
      setStats([...stats, { categoria: novaCategoria, total: 0 }]);
    }
    
    setNovaCategoria("");
    setShowAddModal(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

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
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Livros</span>
            </Link>
            <Link
              href="/admin/dashboard/categorias"
              className="flex items-center space-x-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-lg font-medium"
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
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Categorias</h1>
              <p className="text-gray-600">{stats.length} categorias disponíveis</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-lg font-bold hover:bg-pink-600 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Nova Categoria</span>
            </button>
          </div>

          {/* Categorias Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.categoria}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-6 h-6 text-pink-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stat.total}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{stat.categoria}</h3>
                <p className="text-sm text-gray-600">
                  {stat.total === 0 ? "Nenhum livro" : stat.total === 1 ? "1 livro" : `${stat.total} livros`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nova Categoria</h3>
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nome da categoria"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-6"
              onKeyPress={(e) => e.key === "Enter" && handleAddCategoria()}
            />
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNovaCategoria("");
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddCategoria}
                className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
