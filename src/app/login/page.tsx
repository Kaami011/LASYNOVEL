"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { Mail, Lock, Eye, EyeOff, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar se Supabase está configurado
    if (!isSupabaseConfigured()) {
      setError("⚠️ Supabase não configurado. Configure as variáveis de ambiente.");
      setCheckingAuth(false);
      return;
    }

    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    if (isRedirecting) return;
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Erro ao verificar sessão:", error);
        throw error;
      }
      
      if (session) {
        setIsRedirecting(true);
        router.replace("/painel");
        return;
      }
    } catch (error: any) {
      console.error("Erro ao verificar sessão:", error);
      // Não mostrar erro aqui, apenas logar
    } finally {
      if (!isRedirecting) {
        setCheckingAuth(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Verificar configuração do Supabase
    if (!isSupabaseConfigured()) {
      setError("⚠️ Supabase não configurado. Configure as variáveis de ambiente.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        console.log("🔐 Tentando fazer login...");
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("❌ Erro no login:", error);
          throw error;
        }

        console.log("✅ Login bem-sucedido:", data);
        setSuccess("Login realizado com sucesso!");
        setIsRedirecting(true);
        setTimeout(() => {
          router.replace("/painel");
        }, 1000);
      } else {
        // Cadastro
        if (password !== confirmPassword) {
          throw new Error("As senhas não coincidem");
        }

        if (password.length < 6) {
          throw new Error("A senha deve ter pelo menos 6 caracteres");
        }

        console.log("📝 Tentando criar conta...");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          console.error("❌ Erro no cadastro:", error);
          throw error;
        }

        console.log("✅ Cadastro bem-sucedido:", data);
        setSuccess("Conta criada com sucesso! Redirecionando...");
        setIsRedirecting(true);
        setTimeout(() => {
          router.replace("/painel");
        }, 1000);
      }
    } catch (err: any) {
      console.error("❌ Erro capturado:", err);
      
      // Mensagens de erro mais amigáveis
      let errorMessage = "Ocorreu um erro. Tente novamente.";
      
      if (err.message?.includes("Invalid login credentials")) {
        errorMessage = "Email ou senha incorretos. Verifique suas credenciais.";
      } else if (err.message?.includes("Email not confirmed")) {
        errorMessage = "Por favor, confirme seu email antes de fazer login.";
      } else if (err.message?.includes("User already registered")) {
        errorMessage = "Este email já está cadastrado. Tente fazer login.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured()) {
      setError("⚠️ Supabase não configurado. Configure as variáveis de ambiente.");
      return;
    }

    try {
      console.log("🔐 Tentando login com Google...");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/painel`,
        },
      });

      if (error) {
        console.error("❌ Erro no login Google:", error);
        throw error;
      }
    } catch (err: any) {
      console.error("❌ Erro capturado:", err);
      setError(err.message || "Erro ao fazer login com Google");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando sessão...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 className="text-3xl font-bold text-pink-600 mb-2">
              {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Entre para continuar sua jornada de leitura"
                : "Junte-se a milhões de leitores"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (only for signup) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Remember Me / Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-pink-500 border-pink-300 rounded focus:ring-pink-200"
                    />
                    <span className="text-sm text-gray-700">Lembrar de mim</span>
                  </label>
                  <Link
                    href="/recuperar-senha"
                    className="text-sm text-pink-500 hover:text-pink-600 font-medium"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isSupabaseConfigured()}
                className="w-full py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button 
                onClick={handleGoogleLogin}
                disabled={!isSupabaseConfigured()}
                className="w-full py-3 border-2 border-pink-200 text-gray-700 rounded-xl font-medium hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continuar com Google</span>
              </button>
            </div>

            {/* Toggle Login/Signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-pink-500 hover:text-pink-600 font-bold"
                >
                  {isLogin ? "Criar conta" : "Entrar"}
                </button>
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Ao continuar, você concorda com nossos{" "}
            <Link href="/termos" className="text-pink-500 hover:text-pink-600">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/privacidade" className="text-pink-500 hover:text-pink-600">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
