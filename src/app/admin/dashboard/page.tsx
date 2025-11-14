"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Eye,
  TrendingUp,
  Plus,
  LogOut,
  LayoutDashboard,
  FolderOpen,
  Settings,
} from "lucide-react";

interface Stats {
  totalLivros: number;
  totalUsuarios: number;
  totalVisualizacoes: number;
  livrosMaisVistos: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [stats, setStats] = useState<Stats>({
    totalLivros: 0,
    totalUsuarios: 0,
    totalVisualizacoes: 0,
    livrosMaisVistos: [],
  });

  useEffect(() => {
    console.log("🔍 AdminDashboard montado, iniciando verificações...");
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log("🔐 Verificando autenticação...");
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("❌ Erro ao buscar usuário:", userError);
        router.push("/admin/login");
        return;
      }
      
      if (!user) {
        console.log("❌ Usuário não autenticado, redirecionando...");
        router.push("/admin/login");
        return;
      }

      console.log("✅ Usuário autenticado:", user.id, user.email);
      setUserEmail(user.email || "");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("eh_admin, email")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("❌ Erro ao buscar perfil:", profileError);
        router.push("/admin/login");
        return;
      }

      console.log("📋 Perfil encontrado:", profile);

      if (!profile?.eh_admin) {
        console.log("❌ Usuário não é admin, redirecionando...");
        router.push("/admin/login");
        return;
      }

      console.log("✅ Usuário é admin! Acesso permitido ao dashboard.");
      
      // Carregar estatísticas após confirmar que é admin
      await loadStats();
    } catch (error) {
      console.error("❌ Erro na verificação de autenticação:", error);
      router.push("/admin/login");
    }
  };

  const loadStats = async () => {
    try {
      console.log("📊 Carregando estatísticas...");
      
      // Total de livros
      const { count: livrosCount } = await supabase
        .from("livros")
        .select("*", { count: "exact", head: true });

      console.log("📚 Total de livros:", livrosCount);

      // Total de usuários
      const { count: usuariosCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      console.log("👥 Total de usuários:", usuariosCount);

      // Total de visualizações
      const { data: livros } = await supabase
        .from("livros")
        .select("visualizacoes");

      const totalViews = livros?.reduce((acc, livro) => acc + (livro.visualizacoes || 0), 0) || 0;
      console.log("👁️ Total de visualizações:", totalViews);

      // Livros mais vistos
      const { data: maisVistos } = await supabase
        .from("livros")
        .select("id, titulo, visualizacoes, capa_url")
        .order("visualizacoes", { ascending: false })
        .limit(5);

      console.log("🔥 Livros mais vistos:", maisVistos);

      setStats({
        totalLivros: livrosCount || 0,
        totalUsuarios: usuariosCount || 0,
        totalVisualizacoes: totalViews,
        livrosMaisVistos: maisVistos || [],
      });

      console.log("✅ Estatísticas carregadas com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao carregar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log("🚪 Fazendo logout...");
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
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

          {/* User Info */}
          <div className="mb-6 p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Logado como:</p>
            <p className="text-sm font-medium text-purple-600 truncate">{userEmail}</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-lg font-medium"
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Visão geral do sistema</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-pink-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalLivros}</h3>
              <p className="text-gray-600">Livros</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalUsuarios}</h3>
              <p className="text-gray-600">Usuários</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stats.totalVisualizacoes.toLocaleString()}
              </h3>
              <p className="text-gray-600">Visualizações</p>
            </div>
          </div>

          {/* Livros Mais Vistos */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-bold text-gray-900">Livros Mais Vistos</h2>
              </div>
              <Link
                href="/admin/dashboard/livros"
                className="text-pink-600 hover:text-pink-700 font-medium text-sm"
              >
                Ver todos
              </Link>
            </div>

            <div className="space-y-4">
              {stats.livrosMaisVistos.length > 0 ? (
                stats.livrosMaisVistos.map((livro, index) => (
                  <div
                    key={livro.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-shrink-0 w-12 h-16 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center text-2xl">
                      📖
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{livro.titulo}</h3>
                      <p className="text-sm text-gray-600">
                        {livro.visualizacoes?.toLocaleString() || 0} visualizações
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum livro cadastrado ainda</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admin/dashboard/livros/novo"
              className="bg-pink-500 text-white rounded-xl p-6 hover:bg-pink-600 transition-colors shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Adicionar Livro</h3>
                  <p className="text-pink-100 text-sm">Cadastrar novo livro no sistema</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/dashboard/categorias"
              className="bg-purple-500 text-white rounded-xl p-6 hover:bg-purple-600 transition-colors shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Gerenciar Categorias</h3>
                  <p className="text-purple-100 text-sm">Adicionar e editar categorias</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
