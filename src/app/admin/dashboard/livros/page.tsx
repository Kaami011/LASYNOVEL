"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  LayoutDashboard,
  FolderOpen,
  LogOut,
} from "lucide-react";

interface Livro {
  id: string;
  titulo: string;
  sinopse: string;
  capa_url: string;
  categoria: string;
  visualizacoes: number;
  curtidas: number;
  avaliacao_media: number;
  total_capitulos: number;
  status: string;
}

export default function AdminLivros() {
  const router = useRouter();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [livroToDelete, setLivroToDelete] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadLivros();
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

  const loadLivros = async () => {
    try {
      const { data, error } = await supabase
        .from("livros")
        .select("*")
        .order("data_criacao", { ascending: false });

      if (error) throw error;
      setLivros(data || []);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!livroToDelete) return;

    try {
      // Deletar capítulos primeiro
      await supabase.from("capitulos").delete().eq("livro_id", livroToDelete);
      
      // Deletar livro
      const { error } = await supabase
        .from("livros")
        .delete()
        .eq("id", livroToDelete);

      if (error) throw error;

      setLivros(livros.filter((l) => l.id !== livroToDelete));
      setShowDeleteModal(false);
      setLivroToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      alert("Erro ao deletar livro");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const filteredLivros = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Livros</h1>
              <p className="text-gray-600">{livros.length} livros cadastrados</p>
            </div>
            <Link
              href="/admin/dashboard/livros/novo"
              className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-lg font-bold hover:bg-pink-600 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Livro</span>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar livros..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Livros Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLivros.map((livro) => (
              <div key={livro.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center text-6xl">
                  {livro.capa_url ? (
                    <img src={livro.capa_url} alt={livro.titulo} className="w-full h-full object-cover" />
                  ) : (
                    "📖"
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{livro.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{livro.sinopse}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{livro.visualizacoes?.toLocaleString() || 0}</span>
                    </span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full font-medium">
                      {livro.categoria}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/dashboard/livros/editar/${livro.id}`}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">Editar</span>
                    </Link>
                    <button
                      onClick={() => {
                        setLivroToDelete(livro.id);
                        setShowDeleteModal(true);
                      }}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Deletar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLivros.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum livro encontrado</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja deletar este livro? Esta ação não pode ser desfeita.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setLivroToDelete(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
