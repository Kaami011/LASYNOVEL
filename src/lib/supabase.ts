import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

// Função de diagnóstico para debug
export function diagnoseSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('🔍 Diagnóstico Supabase:');
  console.log('URL configurada:', url ? '✅ Sim' : '❌ Não');
  console.log('URL valor:', url);
  console.log('Key configurada:', key ? '✅ Sim' : '❌ Não');
  console.log('Key (primeiros 20 chars):', key ? key.substring(0, 20) + '...' : 'não definida');
  
  return {
    hasUrl: !!url,
    hasKey: !!key,
    url: url || '',
    keyPrefix: key ? key.substring(0, 20) : ''
  };
}

// Função que cria e retorna o cliente Supabase (lazy loading)
export function getSupabase(): SupabaseClient {
  // Se já existe instância, retorna
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Buscar variáveis de ambiente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Log para debug
  console.log('🔧 Inicializando Supabase...');
  diagnoseSupabaseConfig();

  // Validar variáveis de ambiente
  if (!supabaseUrl || !supabaseAnonKey) {
    const errorMsg = 
      '❌ Variáveis de ambiente do Supabase não configuradas.\n\n' +
      'Configure as seguintes variáveis:\n' +
      `- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅' : '❌ FALTANDO'}\n` +
      `- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅' : '❌ FALTANDO'}\n\n` +
      'Na Vercel: Settings → Environment Variables\n' +
      'Localmente: arquivo .env.local na raiz do projeto';
    
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Validar formato da URL
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
    const errorMsg = `❌ URL do Supabase inválida: ${supabaseUrl}\n\nFormato esperado: https://[projeto].supabase.co`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Validar formato da chave
  if (!supabaseAnonKey.startsWith('eyJ')) {
    const errorMsg = '❌ Chave Anon Key do Supabase parece inválida.\n\nA chave deve começar com "eyJ"';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    // Criar e armazenar instância
    console.log('✅ Criando cliente Supabase...');
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    
    console.log('✅ Cliente Supabase criado com sucesso!');
    return supabaseInstance;
  } catch (error) {
    console.error('❌ Erro ao criar cliente Supabase:', error);
    throw error;
  }
}

// Export compatível com código existente
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabase();
    return client[prop as keyof SupabaseClient];
  }
});

// Helper para verificar se o Supabase está configurado
export const isSupabaseConfigured = (): boolean => {
  try {
    getSupabase();
    return true;
  } catch {
    return false;
  }
};

// Helper para testar conexão
export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  try {
    console.log('🧪 Testando conexão com Supabase...');
    const client = getSupabase();
    
    // Tentar fazer uma requisição simples
    const { data, error } = await client.auth.getSession();
    
    if (error) {
      console.error('❌ Erro ao testar conexão:', error);
      return {
        success: false,
        message: `Erro ao conectar: ${error.message}`,
        details: error
      };
    }
    
    console.log('✅ Conexão com Supabase OK!');
    return {
      success: true,
      message: 'Conexão estabelecida com sucesso!',
      details: { hasSession: !!data.session }
    };
  } catch (error: any) {
    console.error('❌ Erro crítico ao testar conexão:', error);
    return {
      success: false,
      message: error.message || 'Erro desconhecido',
      details: error
    };
  }
}
