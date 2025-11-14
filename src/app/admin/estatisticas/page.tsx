"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Eye,
  Calendar,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface ChartData {
  month: string;
  views: number;
  users: number;
  books: number;
}

export default function StatisticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    checkAuth();
    loadStatistics();
  }, [timeRange]);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setLoading(false);
  };

  const loadStatistics = () => {
    // Mock data para o gráfico
    const mockData: ChartData[] = [
      { month: "Jan", views: 1200000, users: 850, books: 12 },
      { month: "Fev", views: 1500000, users: 920, books: 13 },
      { month: "Mar", views: 1800000, users: 1050, books: 14 },
      { month: "Abr", views: 2200000, users: 1180, books: 15 },
      { month: "Mai", views: 2500000, users: 1250, books: 15 },
    ];
    setChartData(mockData);
  };

  const maxViews = Math.max(...chartData.map((d) => d.views));
  const maxUsers = Math.max(...chartData.map((d) => d.users));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Voltar</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Estatísticas</h1>
                  <p className="text-xs text-gray-500">Análise de desempenho</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 mr-4">Período:</span>
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => setTimeRange("7d")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === "7d"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                7 dias
              </button>
              <button
                onClick={() => setTimeRange("30d")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === "30d"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                30 dias
              </button>
              <button
                onClick={() => setTimeRange("90d")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === "90d"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                90 dias
              </button>
              <button
                onClick={() => setTimeRange("1y")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === "1y"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                1 ano
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                <span>25%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">2.5M</h3>
            <p className="text-sm text-gray-600">Visualizações Totais</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                <span>12%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">1,250</h3>
            <p className="text-sm text-gray-600">Novos Usuários</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                <span>8%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">15</h3>
            <p className="text-sm text-gray-600">Livros Publicados</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center space-x-1 text-red-600 text-sm font-medium">
                <ArrowDown className="w-4 h-4" />
                <span>3%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">4.7</h3>
            <p className="text-sm text-gray-600">Avaliação Média</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Views Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Visualizações por Mês</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Visualizações</span>
              </div>
            </div>
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {(data.views / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.views / maxViews) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Novos Usuários por Mês</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Usuários</span>
              </div>
            </div>
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {data.users.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.users / maxUsers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Books */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Livros Mais Visualizados</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { title: "Amor Proibido: O Segredo do Bilionário", views: "2.5M", trend: "+15%" },
                { title: "Destino Entrelaçado", views: "1.8M", trend: "+12%" },
                { title: "A Herdeira Esquecida", views: "1.5M", trend: "+8%" },
                { title: "Coração de Gelo", views: "1.3M", trend: "+5%" },
                { title: "Paixão Inesperada", views: "1.2M", trend: "+3%" },
              ].map((book, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{book.title}</h4>
                      <p className="text-sm text-gray-600">{book.views} visualizações</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                    <ArrowUp className="w-4 h-4" />
                    <span>{book.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
