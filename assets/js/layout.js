/* ============================================================
   ARQUIVO: assets/js/layout.js
   Inicializa o sistema
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DESENHAR O LAYOUT (Chama a função do components.js)
    if (typeof renderLayout === 'function') {
        renderLayout();
    }

    // 2. REMOVER TELA DE LOADING (Damos um pequeno delay para garantir render)
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        if(loading) loading.style.display = 'none';
    }, 100);

    // 3. LOGICA DE TEMA
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('pandda-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    if(themeIcon) themeIcon.innerText = savedTheme === 'light' ? 'dark_mode' : 'light_mode';

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const newTheme = current === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('pandda-theme', newTheme);
            if(themeIcon) themeIcon.innerText = newTheme === 'light' ? 'dark_mode' : 'light_mode';
        });
    }

    // 4. LOGICA DE SIDEBAR (Mobile/Desktop)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if(sidebarToggle && sidebar && overlay) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth > 768) {
                document.body.classList.toggle('collapsed');
            } else {
                sidebar.classList.toggle('mobile-active');
                overlay.classList.toggle('active');
            }
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-active');
            overlay.classList.remove('active');
        });
    }

    // 5. LOGOUT
    const btnLogout = document.getElementById('btn-logout');
    if(btnLogout) {
        btnLogout.addEventListener('click', async () => {
            if(confirm("Deseja realmente sair?")) {
                if(window.supabaseClient) await window.supabaseClient.auth.signOut();
                localStorage.removeItem('sb-yvktnznpozluqcjtvxeu-auth-token');
                window.location.href = '/pages/login/index.html';
            }
        });
    }
});