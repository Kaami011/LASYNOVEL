"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Calendar,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  created_at: string;
  quiz_completed: boolean;
  age_range?: string;
  gender?: string;
  favorite_genres?: string[];
  reading_frequency?: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterQuiz, setFilterQuiz] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    checkAuth();
    loadUsers();
  }, []);

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

  const loadUsers = async () => {
    // Mock data - você pode substituir por dados reais do Supabase
    const mockUsers: User[] = [
      {
        id: "1",
        email: "usuario1@example.com",
        created_at: "2024-01-15T10:00:00Z",
        quiz_completed: true,
        age_range: "25-34 anos",
        gender: "Feminino",
        favorite_genres: ["Romance", "Fantasia"],
        reading_frequency: "Diariamente",
      },
      {
        id: "2",
        email: "usuario2@example.com",
        created_at: "2024-01-20T14:30:00Z",
        quiz_completed: false,
      },
      {
        id: "3",
        email: "usuario3@example.com",
        created_at: "2024-02-01T09:15:00Z",
        quiz_completed: true,
        age_range: "18-24 anos",
        gender: "Masculino",
        favorite_genres: ["Ficção", "Mistério/Terror"],
        reading_frequency: "Semanalmente",
      },
      {
        id: "4",
        email: "usuario4@example.com",
        created_at: "2024-02-10T16:45:00Z",
        quiz_completed: true,
        age_range: "35-44 anos",
        gender: "Feminino",
        favorite_genres: ["Romance", "Autoajuda"],
        reading_frequency: "Mensalmente",
      },
      {
        id: "5",
        email: "usuario5@example.com",
        created_at: "2024-02-15T11:20:00Z",
        quiz_completed: false,
      },
    ];

    setUsers(mockUsers);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterQuiz === "all" ||
      (filterQuiz === "completed" && user.quiz_completed) ||
      (filterQuiz === "pending" && !user.quiz_completed);
    return matchesSearch && matchesFilter;
  });

  const exportToCSV = () => {
    const csv = [
      ["Email", "Data de Cadastro", "Quiz Completo", "Faixa Etária", "Gênero", "Frequência de Leitura"],
      ...filteredUsers.map((user) => [
        user.email,
        new Date(user.created_at).toLocaleDateString("pt-BR"),
        user.quiz_completed ? "Sim" : "Não",
        user.age_range || "-",
        user.gender || "-",
        user.reading_frequency || "-",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "usuarios.csv";
    a.click();
  };

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
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Usuários</h1>
                  <p className="text-xs text-gray-500">{users.length} usuários cadastrados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{users.length}</h3>
            <p className="text-sm text-gray-600">Total de Usuários</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {users.filter((u) => u.quiz_completed).length}
            </h3>
            <p className="text-sm text-gray-600">Quiz Completo</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {users.filter((u) => !u.quiz_completed).length}
            </h3>
            <p className="text-sm text-gray-600">Quiz Pendente</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => setFilterQuiz("all")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterQuiz === "all"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterQuiz("completed")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterQuiz === "completed"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Quiz Completo
                </button>
                <button
                  onClick={() => setFilterQuiz("pending")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterQuiz === "pending"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Pendente
                </button>
              </div>

              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Exportar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Cadastro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faixa Etária
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gêneros Favoritos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequência
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.email}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(user.created_at).toLocaleDateString("pt-BR")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.quiz_completed ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completo
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          <XCircle className="w-3 h-3 mr-1" />
                          Pendente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.age_range || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {user.favorite_genres ? (
                        <div className="flex flex-wrap gap-1">
                          {user.favorite_genres.map((genre, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.reading_frequency || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum usuário encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
