// assets/js/supabase-client.js

// COLOQUE SUAS CHAVES AQUI
const SUPABASE_URL = 'SUA_URL_DO_SUPABASE_AQUI'; 
const SUPABASE_ANON_KEY = 'SUA_KEY_ANON_PUBLIC_AQUI';

// Inicializa o cliente apenas se a biblioteca estiver carregada
let supabase;

if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase Client inicializado.');
} else {
    console.error('ERRO: Biblioteca Supabase não encontrada. Verifique o <script> no head.');
}

// Exporta para uso global
window.sb = supabase;