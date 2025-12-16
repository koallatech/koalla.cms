// assets/js/auth-guard.js

(async function() {
    console.log("AuthGuard: Verificando permissão...");

    // Verifica se o cliente Supabase existe
    if (!window.sb) {
        console.error("AuthGuard: Cliente Supabase (window.sb) não encontrado. Verifique a ordem dos scripts.");
        return;
    }

    // Busca a sessão
    const { data: { session }, error } = await window.sb.auth.getSession();

    if (error) {
        console.error("Erro ao verificar sessão:", error);
        window.location.href = '../../pages/login/index.html';
        return;
    }

    // Se NÃO tem sessão, redireciona para o login
    if (!session) {
        console.warn("Acesso não autorizado. Redirecionando para login.");
        window.location.href = '../../pages/login/index.html';
    } else {
        // Opcional: Logar quem entrou
        // console.log("Acesso permitido para:", session.user.email);
    }
})();