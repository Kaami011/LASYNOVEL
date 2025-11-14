"use client";

import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { CheckCircle, XCircle, AlertCircle, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DiagnosticoSupabase() {
  const [diagnostico, setDiagnostico] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    executarDiagnostico();
  }, []);

  const executarDiagnostico = async () => {
    setLoading(true);
    const resultado: any = {
      timestamp: new Date().toISOString(),
      ambiente: typeof window !== 'undefined' ? window.location.origin : 'unknown',
      checks: []
    };

    // 1. Verificar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    resultado.checks.push({
      nome: "Variáveis de Ambiente",
      status: supabaseUrl && supabaseKey ? "success" : "error",
      detalhes: {
        NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "✅ Configurada" : "❌ Faltando",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseKey ? "✅ Configurada" : "❌ Faltando",
        url_valor: supabaseUrl || "não configurada"
      }
    });

    // 2. Testar conexão com Supabase
    try {
      const { data, error } = await supabase.auth.getSession();
      resultado.checks.push({
        nome: "Conexão com Supabase",
        status: error ? "error" : "success",
        detalhes: error ? { erro: error.message } : { mensagem: "Conexão OK" }
      });
    } catch (error: any) {
      resultado.checks.push({
        nome: "Conexão com Supabase",
        status: "error",
        detalhes: { 
          erro: error.message,
          tipo: error.name,
          stack: error.stack?.split('\n')[0]
        }
      });
    }

    // 3. Verificar CORS
    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
        method: 'GET',
        headers: {
          'apikey': supabaseKey || ''
        }
      });
      
      resultado.checks.push({
        nome: "CORS e Conectividade",
        status: response.ok ? "success" : "error",
        detalhes: {
          status: response.status,
          statusText: response.statusText,
          origem: typeof window !== 'undefined' ? window.location.origin : 'unknown'
        }
      });
    } catch (error: any) {
      resultado.checks.push({
        nome: "CORS e Conectividade",
        status: "error",
        detalhes: {
          erro: error.message,
          tipo: "Possível problema de CORS",
          solucao: "Configure o domínio no Supabase"
        }
      });
    }

    // 4. Verificar domínio atual
    if (typeof window !== 'undefined') {
      const dominioAtual = window.location.origin;
      const isDominioProd = dominioAtual.includes('bomromance.com.br');
      
      resultado.checks.push({
        nome: "Domínio Atual",
        status: "info",
        detalhes: {
          dominio: dominioAtual,
          tipo: isDominioProd ? "Produção" : "Desenvolvimento",
          aviso: isDominioProd ? "⚠️ Certifique-se de que bomromance.com.br está configurado no Supabase" : "✅ Ambiente de desenvolvimento"
        }
      });
    }

    setDiagnostico(resultado);
    setLoading(false);
  };

  const copiarInstrucoes = () => {
    const instrucoes = `
INSTRUÇÕES PARA CONFIGURAR SUPABASE EM PRODUÇÃO (bomromance.com.br)

1. Acesse o Dashboard do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em "Authentication" → "URL Configuration"
4. Adicione as seguintes URLs:

Site URL:
https://bomromance.com.br

Redirect URLs (adicione todas):
https://bomromance.com.br/**
https://bomromance.com.br/painel
https://bomromance.com.br/login
https://bomromance.com.br/auth/callback

5. Salve as alterações
6. Aguarde alguns minutos para propagar
7. Teste novamente o login em bomromance.com.br

IMPORTANTE: 
- O domínio DEVE estar exatamente como configurado (com ou sem www)
- Certifique-se de que as variáveis de ambiente estão corretas na Vercel
- Faça um novo deploy após configurar
`;
    
    navigator.clipboard.writeText(instrucoes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "error":
        return <XCircle className="w-6 h-6 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Executando diagnóstico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Diagnóstico Supabase
          </h1>
          <p className="text-gray-600">
            Verificação completa da configuração e conectividade
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Executado em: {new Date(diagnostico.timestamp).toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Ambiente */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ambiente Atual</h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-blue-800 font-mono text-sm break-all">
              {diagnostico.ambiente}
            </p>
          </div>
        </div>

        {/* Checks */}
        <div className="space-y-4 mb-6">
          {diagnostico.checks.map((check: any, index: number) => (
            <div key={index} className="bg-white rounded-3xl shadow-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(check.status)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {check.nome}
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(check.detalhes, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instruções para Produção */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-start space-x-4 mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-orange-800 mb-2">
                ⚠️ Problema em Produção (bomromance.com.br)?
              </h2>
              <p className="text-orange-700 mb-4">
                Se o login funciona na Lasy mas NÃO funciona em bomromance.com.br, 
                o problema é CORS. Siga as instruções abaixo:
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
              Acesse o Dashboard do Supabase
            </h3>
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              <span>https://supabase.com/dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
              Vá em Authentication → URL Configuration
            </h3>
            <p className="text-gray-600 text-sm">
              No menu lateral, clique em "Authentication" e depois em "URL Configuration"
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
              Configure as URLs
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Site URL:</p>
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 font-mono text-sm">
                  https://bomromance.com.br
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Redirect URLs (adicione todas):</p>
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 font-mono text-sm space-y-1">
                  <div>https://bomromance.com.br/**</div>
                  <div>https://bomromance.com.br/painel</div>
                  <div>https://bomromance.com.br/login</div>
                  <div>https://bomromance.com.br/auth/callback</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
              Salve e Aguarde
            </h3>
            <p className="text-gray-600 text-sm">
              Clique em "Save" e aguarde alguns minutos para as alterações propagarem.
              Depois, faça um novo deploy na Vercel.
            </p>
          </div>

          <button
            onClick={copiarInstrucoes}
            className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center space-x-2"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? "✅ Copiado!" : "Copiar Todas as Instruções"}</span>
          </button>
        </div>

        {/* Verificação Vercel */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            🔧 Verificar Variáveis na Vercel
          </h2>
          <div className="space-y-3 text-sm text-blue-700">
            <p>1. Acesse o projeto na Vercel</p>
            <p>2. Vá em Settings → Environment Variables</p>
            <p>3. Certifique-se de que estas variáveis existem:</p>
            <div className="bg-white rounded-lg p-4 font-mono text-xs space-y-2 mt-2">
              <div>NEXT_PUBLIC_SUPABASE_URL</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY</div>
            </div>
            <p className="mt-3">4. Faça um novo deploy após qualquer alteração</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={executarDiagnostico}
            className="flex-1 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-all"
          >
            🔄 Executar Novamente
          </button>
          <Link
            href="/login"
            className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-all text-center"
          >
            ← Voltar para Login
          </Link>
        </div>
      </div>
    </div>
  );
}
