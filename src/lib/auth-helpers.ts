import { supabase } from './supabase';

/**
 * Verifica se o usuário atual é um administrador
 * @returns Promise com objeto contendo isAdmin e user
 */
export async function checkIsAdmin() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { isAdmin: false, user: null };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('eh_admin, email')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return { isAdmin: false, user };
    }

    return { 
      isAdmin: profile.eh_admin === true, 
      user,
      profile 
    };
  } catch (error) {
    console.error('Erro ao verificar admin:', error);
    return { isAdmin: false, user: null };
  }
}

/**
 * Verifica se há uma sessão ativa
 * @returns Promise com a sessão ou null
 */
export async function getActiveSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Erro ao buscar sessão:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return null;
  }
}

/**
 * Faz logout do usuário
 */
export async function signOut() {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { success: false, error };
  }
}
