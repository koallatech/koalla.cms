// 1. Configuração do Supabase (Chaves Fornecidas)
const SUPABASE_URL = 'https://yvktnznpozluqcjtvxeu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2a3Ruem5wb3psdXFjanR2eGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDgwNzIsImV4cCI6MjA4MTQyNDA3Mn0.mWaYmPCXNoOElk8gPFMFQnsdC_k75tpWPmjcfwqNMoY';

// Inicializa o cliente e o coloca no escopo global (window)
// Isso permite que o HTML acesse o 'supabaseClient' sem erros
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase Client inicializado com sucesso.");

// 2. Lógica de Proteção de Rotas (Anti-Loop e Auth Guard)
async function gerenciarAutenticacao() {
    // Verifica a sessão atual
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    
    const caminhoAtual = window.location.pathname;
    // Verifica se estamos na pasta de login
    const estouNoLogin = caminhoAtual.includes('/login');

    // CENÁRIO A: Usuário NÃO logado e tenta acessar página interna
    // Ação: Manda para o Login
    if (!session && !estouNoLogin) {
        console.log("Acesso restrito. Redirecionando para login...");
        window.location.href = '/pages/login/index.html'; 
        return;
    }

    // CENÁRIO B: Usuário JÁ logado e tenta acessar a tela de Login
    // Ação: Manda para a Home (Dashboard)
    if (session && estouNoLogin) {
        console.log("Usuário já logado. Redirecionando para home...");
        window.location.href = '/index.html';
        return;
    }

    console.log("Rota permitida: " + caminhoAtual);
}

// 3. Monitoramento de Login/Logout em tempo real
window.supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        // Se deslogou, força ir para o login
        window.location.href = '/pages/login/index.html';
    }
});

// Executa a verificação ao carregar o script
gerenciarAutenticacao();