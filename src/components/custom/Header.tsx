"use client";

import { Search, User, Heart, Menu, X, LogOut, ChevronDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Categorias disponíveis
  const categories = [
    "Romance",
    "Romance +18",
    "Romance Paranormal",
    "Drama",
    "Fantasia",
    "Ficção Científica",
    "Suspense",
    "Histórico",
    "Contemporâneo"
  ];

  useEffect(() => {
    // Só verificar usuário se Supabase estiver configurado
    if (isSupabaseConfigured() && supabase) {
      checkUser();

      // Listener para mudanças de autenticação
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const checkUser = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-pink-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f3f0ad31-b44e-4814-8baa-93a89d6e6213.png" 
              alt="Bom Romance" 
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-pink-500">
              Bom Romance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Início
            </Link>
            
            {/* Explorar com Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setExploreMenuOpen(true)}
                onMouseLeave={() => setExploreMenuOpen(false)}
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center space-x-1"
              >
                <span>Explorar</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {exploreMenuOpen && (
                <div
                  onMouseEnter={() => setExploreMenuOpen(true)}
                  onMouseLeave={() => setExploreMenuOpen(false)}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-pink-100 py-2 z-50"
                >
                  <Link
                    href="/explorar"
                    className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors font-medium"
                  >
                    Todos os Livros
                  </Link>
                  <div className="border-t border-pink-100 my-2"></div>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/explorar?categoria=${encodeURIComponent(category)}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/em-alta" className="text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Em Alta</span>
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
            
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/painel"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-pink-50 rounded-full transition-colors"
                    >
                      <User className="w-5 h-5 text-gray-700" />
                      <span className="text-gray-700 font-medium">Perfil</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Sair"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Entrar
                  </Link>
                )}
              </>
            )}
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
              
              {/* Explorar Mobile */}
              <div>
                <Link href="/explorar" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2 block">
                  Explorar
                </Link>
                <div className="pl-4 mt-2 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/explorar?categoria=${encodeURIComponent(category)}`}
                      className="block text-sm text-gray-600 hover:text-pink-500 transition-colors py-1"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/em-alta" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Em Alta</span>
              </Link>
              <Link href="/novos" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2">
                Novos
              </Link>
              <Link href="/favoritos" className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Favoritos
              </Link>
              
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link
                        href="/painel"
                        className="text-gray-700 hover:text-pink-500 transition-colors font-medium py-2 flex items-center"
                      >
                        <User className="w-5 h-5 mr-2" />
                        Meu Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 transition-colors font-medium py-2 flex items-center text-left"
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Sair
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 hover:shadow-lg transition-all duration-300 font-medium text-center"
                    >
                      Entrar
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
