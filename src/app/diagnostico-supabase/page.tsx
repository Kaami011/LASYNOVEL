"use client";

import { useState, useEffect } from "react";
import { diagnoseSupabaseConfig, testSupabaseConnection } from "@/lib/supabase";
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function DiagnosticoSupabasePage() {
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [connectionTest, setConnectionTest] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    runDiagnosis();
  }, []);

  const runDiagnosis = async () => {
    setTesting(true);
    
    // Diagnóstico de configuração
    const config = diagnoseSupabaseConfig();
    setDiagnosis(config);

    // Teste de conexão
    if (config.hasUrl && config.hasKey) {
      const test = await testSupabaseConnection();
      setConnectionTest(test);
    }

    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Diagnóstico Supabase
          </h1>
          <p className="text-gray-600">
            Verifique a configuração e conexão com o Supabase
          </p>
        </div>

        {/* Botão de Refresh */}
        <div className="mb-6">
          <button
            onClick={runDiagnosis}
            disabled={testing}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testando...' : 'Testar Novamente'}</span>
          </button>
        </div>

        {/* Configuração */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📋 Configuração
          </h2>

          <div className="space-y-4">
            {/* URL */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 mt-1">
                {diagnosis?.hasUrl ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  NEXT_PUBLIC_SUPABASE_URL
                </h3>
                <p className="text-sm text-gray-600 break-all">
                  {diagnosis?.url || "❌ Não configurada"}
                </p>
              </div>
            </div>

            {/* Key */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 mt-1">
                {diagnosis?.hasKey ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  NEXT_PUBLIC_SUPABASE_ANON_KEY
                </h3>
                <p className="text-sm text-gray-600 font-mono">
                  {diagnosis?.keyPrefix ? `${diagnosis.keyPrefix}...` : "❌ Não configurada"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Teste de Conexão */}
        {connectionTest && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🔌 Teste de Conexão
            </h2>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 mt-1">
                {connectionTest.success ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  {connectionTest.success ? "✅ Conexão OK" : "❌ Falha na Conexão"}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {connectionTest.message}
                </p>
                {connectionTest.details && (
                  <details className="text-xs text-gray-500">
                    <summary className="cursor-pointer hover:text-gray-700">
                      Ver detalhes técnicos
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto">
                      {JSON.stringify(connectionTest.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instruções */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 Como Corrigir Problemas
          </h2>

          <div className="space-y-6">
            {/* Variáveis não configuradas */}
            {(!diagnosis?.hasUrl || !diagnosis?.hasKey) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-bold text-red-900 mb-2">
                      Variáveis de Ambiente Faltando
                    </h3>
                    <ol className="text-sm text-red-800 space-y-2 list-decimal list-inside">
                      <li>Acesse o projeto na Vercel</li>
                      <li>Vá em <strong>Settings → Environment Variables</strong></li>
                      <li>Adicione as variáveis:
                        <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                          <li><code className="bg-red-100 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                          <li><code className="bg-red-100 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                        </ul>
                      </li>
                      <li>Faça um novo deploy</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Erro de conexão */}
            {connectionTest && !connectionTest.success && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-bold text-yellow-900 mb-2">
                      Erro de Conexão (CORS/Failed to fetch)
                    </h3>
                    <ol className="text-sm text-yellow-800 space-y-2 list-decimal list-inside">
                      <li>Acesse o <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline font-bold">Dashboard do Supabase</a></li>
                      <li>Selecione seu projeto</li>
                      <li>Vá em <strong>Authentication → URL Configuration</strong></li>
                      <li>Adicione o domínio do seu site em <strong>Site URL</strong>:
                        <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                          <li><code className="bg-yellow-100 px-2 py-1 rounded">{typeof window !== 'undefined' ? window.location.origin : 'https://seu-dominio.com'}</code></li>
                        </ul>
                      </li>
                      <li>Adicione também em <strong>Redirect URLs</strong></li>
                      <li>Salve as alterações</li>
                      <li>Aguarde alguns minutos e teste novamente</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Onde encontrar as chaves */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 mb-2">
                    🔑 Onde Encontrar as Chaves
                  </h3>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    <li>Acesse: <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline font-bold">supabase.com/dashboard</a></li>
                    <li>Selecione seu projeto</li>
                    <li>Vá em <strong>Settings → API</strong></li>
                    <li>Copie:
                      <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                        <li><strong>Project URL</strong> → NEXT_PUBLIC_SUPABASE_URL</li>
                        <li><strong>anon/public key</strong> → NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-colors"
          >
            Voltar para Login
          </Link>
        </div>
      </div>
    </div>
  );
}
