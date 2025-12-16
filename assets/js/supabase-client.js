// assets/js/supabase-client.js

// COLOQUE SUAS CHAVES AQUI
const SUPABASE_URL = 'https://yvktnznpozluqcjtvxeu.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2a3Ruem5wb3psdXFjanR2eGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDgwNzIsImV4cCI6MjA4MTQyNDA3Mn0.mWaYmPCXNoOElk8gPFMFQnsdC_k75tpWPmjcfwqNMoY';

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