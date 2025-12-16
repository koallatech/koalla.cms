// 1. Configuração do Supabase
const SUPABASE_URL = 'https://yvktnznpozluqcjtvxeu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2a3Ruem5wb3psdXFjanR2eGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDgwNzIsImV4cCI6MjA4MTQyNDA3Mn0.mWaYmPCXNoOElk8gPFMFQnsdC_k75tpWPmjcfwqNMoY';

// Inicializa o cliente globalmente
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase Client ativo.");

async function gerenciarAutenticacao() {
    // Busca elemento de loading
    const loadingScreen = document.getElementById('loading-screen');
    
    // Verifica sessão
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    
    const caminhoAtual = window.location.pathname;
    const estouNoLogin = caminhoAtual.includes('/pages/login');

    // --- LÓGICA DE BLOQUEIO ---

    // 1. Usuário NÃO logado tentando acessar área restrita
    if (!session && !estouNoLogin) {
        console.log("Acesso negado. Redirecionando para login...");
        window.location.href = '/pages/login/index.html'; 
        // NÃO removemos o loadingScreen aqui (o usuário não deve ver a home)
        return; 
    }

    // 2. Usuário JÁ logado tentando acessar a tela de login
    if (session && estouNoLogin) {
        console.log("Já logado. Redirecionando para dashboard...");
        window.location.href = '/index.html';
        // NÃO removemos o loadingScreen aqui (o usuário não deve ver o form de login)
        return;
    }

    // --- LIBERA O ACESSO ---
    
    console.log("Acesso permitido.");
    
    // Se chegou aqui, está na página certa. Removemos a cortina.
    if (loadingScreen) {
        loadingScreen.style.opacity = '0'; // Efeito visual de fade-out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300); // Espera o fade terminar
    }
}

// Monitora Logout em tempo real
window.supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        window.location.href = '/pages/login/index.html';
    }
});

// Executa
gerenciarAutenticacao();