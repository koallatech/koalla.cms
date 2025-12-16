// 1. Configuração do Supabase
// SUBSTITUA PELAS SUAS CHAVES REAIS
const SUPABASE_URL = 'https://yvktnznpozluqcjtvxeu.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2a3Ruem5wb3psdXFjanR2eGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDgwNzIsImV4cCI6MjA4MTQyNDA3Mn0.mWaYmPCXNoOElk8gPFMFQnsdC_k75tpWPmjcfwqNMoY';

// Inicializa o cliente
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase Client inicializado.");

// 2. Lógica de Proteção de Rotas (Anti-Loop)
async function gerenciarAutenticacao() {
    // Pega a sessão atual
    const { data: { session } } = await supabase.auth.getSession();
    
    // Descobre onde o usuário está agora
    const caminhoAtual = window.location.pathname;
    
    // Verifica se estamos na página de login (ajuste a string se sua pasta tiver outro nome)
    const estouNoLogin = caminhoAtual.includes('/login');

    // CENÁRIO A: Usuário NÃO logado e NÃO está no login
    // Ação: Manda para o login (Protege as páginas internas)
    if (!session && !estouNoLogin) {
        console.log("Usuário não logado. Redirecionando para login...");
        window.location.href = '/pages/login/index.html'; // Ajuste este caminho se necessário
        return;
    }

    // CENÁRIO B: Usuário JÁ logado e tenta acessar o login
    // Ação: Manda para o painel principal (Evita que ele faça login de novo)
    if (session && estouNoLogin) {
        console.log("Usuário já logado. Redirecionando para home...");
        window.location.href = '/index.html'; // Ajuste para sua página principal
        return;
    }

    console.log("Rota permitida.");
}

// 3. Ouve mudanças no estado (Login/Logout em tempo real)
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        window.location.href = '/pages/login/index.html';
    }
});

// Executa a verificação assim que o script carrega
gerenciarAutenticacao();