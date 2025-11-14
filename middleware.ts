import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  try {
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log('🔍 Middleware - Path:', req.nextUrl.pathname);
    console.log('🔍 Middleware - Session:', session ? 'Existe' : 'Não existe');

    // Proteger rotas /admin/* (exceto /admin/login)
    if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
      console.log('🔒 Rota admin protegida detectada');
      
      if (!session) {
        console.log('❌ Sem sessão, redirecionando para /admin/login');
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      // Verificar se é admin
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('eh_admin, email')
          .eq('id', session.user.id)
          .single();

        console.log('📋 Perfil encontrado:', profile);

        if (profileError) {
          console.error('❌ Erro ao buscar perfil:', profileError);
          return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        if (!profile?.eh_admin) {
          console.log('❌ Usuário não é admin, redirecionando');
          return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        console.log('✅ Usuário é admin, acesso permitido');
      } catch (error) {
        console.error('❌ Erro ao verificar perfil admin:', error);
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    // Proteger rota /painel
    if (req.nextUrl.pathname.startsWith('/painel')) {
      if (!session) {
        console.log('❌ Sem sessão em /painel, redirecionando para /login');
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Redirecionar usuários logados que tentam acessar /login
    if (req.nextUrl.pathname === '/login' && session) {
      console.log('✅ Usuário logado tentando acessar /login');
      
      // Verificar se é admin
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('eh_admin')
          .eq('id', session.user.id)
          .single();

        if (profile?.eh_admin) {
          console.log('✅ Admin detectado, redirecionando para /admin/dashboard');
          return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        }
      } catch (error) {
        console.error('❌ Erro ao verificar admin:', error);
      }
      
      console.log('✅ Usuário normal, redirecionando para /painel');
      return NextResponse.redirect(new URL('/painel', req.url));
    }

    // Redirecionar usuários logados que tentam acessar /admin/login
    if (req.nextUrl.pathname === '/admin/login' && session) {
      console.log('✅ Usuário logado tentando acessar /admin/login');
      
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('eh_admin')
          .eq('id', session.user.id)
          .single();

        if (profile?.eh_admin) {
          console.log('✅ Admin já logado, redirecionando para dashboard');
          return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        } else {
          console.log('❌ Não é admin, fazendo logout');
          // Não é admin, fazer logout
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.error('❌ Erro ao verificar admin:', error);
      }
    }

    return res;
  } catch (error) {
    console.error('❌ Erro no middleware:', error);
    // Em caso de erro, permite o acesso
    return res;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/painel/:path*', '/login', '/admin/login'],
};
