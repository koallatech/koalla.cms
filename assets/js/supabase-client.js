const SUPABASE_URL = 'https://yvktnznpozluqcjtvxeu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2a3Ruem5wb3psdXFjanR2eGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDgwNzIsImV4cCI6MjA4MTQyNDA3Mn0.mWaYmPCXNoOElk8gPFMFQnsdC_k75tpWPmjcfwqNMoY';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase Client ativo.");

async function gerenciarAutenticacao() {
    const loadingScreen = document.getElementById('loading-screen');
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    
    const caminho = window.location.pathname;
    
    // DEFINIÇÃO DAS ZONAS
    // Verifica se estamos na raiz, no login ou no dashboard
    const isRoot = caminho === '/' || caminho === '/index.html';
    const isLogin = caminho.includes('/pages/login');
    const isDashboard = caminho.includes('/pages/dashboard');

    // --- REGRAS DE REDIRECIONAMENTO ---

    // 1. Se estiver na RAIZ (/):
    //    - Se tem sessão -> Vai para Dashboard
    //    - Se não tem -> Vai para Login
    if (isRoot) {
        if (session) {
            window.location.href = '/pages/dashboard/index.html';
        } else {
            window.location.href = '/pages/login/index.html';
        }
        return; // Pára a execução aqui
    }

    // 2. Tenta aceder ao DASHBOARD sem sessão -> Manda para Login
    if (isDashboard && !session) {
        console.log("Acesso negado. Redirecionando...");
        window.location.href = '/pages/login/index.html';
        return;
    }

    // 3. Tenta aceder ao LOGIN já com sessão -> Manda para Dashboard
    if (isLogin && session) {
        console.log("Já autenticado. Redirecionando...");
        window.location.href = '/pages/dashboard/index.html';
        return;
    }

    // --- ACESSO PERMITIDO ---
    console.log("Acesso permitido.");
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
    }
}

window.supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        window.location.href = '/pages/login/index.html';
    }
});

gerenciarAutenticacao();