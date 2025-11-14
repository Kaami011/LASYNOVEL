import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error("❌ ERRO: NEXT_PUBLIC_SUPABASE_URL não configurada!");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ ERRO: SUPABASE_SERVICE_ROLE_KEY não configurada!");
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // 🔥 Client ADMIN
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
