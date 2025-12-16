// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
    checkTheme();
});

async function loadComponents() {
    // Carrega Sidebar
    const sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer) {
        sidebarContainer.innerHTML = getSidebarHTML(); 
    }

    // Carrega Topbar
    const topbarContainer = document.getElementById("topbar-container");
    if (topbarContainer) {
        topbarContainer.innerHTML = getTopbarHTML();
        // Recarrega ícones (Phosphor) caso necessário
        if (window.PhosphorIcons) window.PhosphorIcons.replace();
    }
    
    highlightCurrentPage();
}

function getSidebarHTML() {
    return `
        <aside class="sidebar" id="sidebar">
            <div class="logo-area">
                <i class="ph ph-television-simple"></i>
                <span>Pandda</span>
            </div>
            <nav>
                <a href="../dashboard/index.html" class="nav-link" id="link-dashboard">
                    <i class="ph ph-squares-four"></i> Dashboard
                </a>
                <a href="../clientes/index.html" class="nav-link" id="link-clientes">
                    <i class="ph ph-users"></i> Clientes
                </a>
                <a href="../servidores/index.html" class="nav-link" id="link-servidores">
                    <i class="ph ph-hard-drives"></i> Servidores
                </a>
                <a href="../apps/index.html" class="nav-link" id="link-apps">
                    <i class="ph ph-google-play-logo"></i> Apps
                </a>
                <a href="../planos/index.html" class="nav-link" id="link-planos">
                    <i class="ph ph-money"></i> Planos
                </a>
                <a href="../pontos-acesso/index.html" class="nav-link" id="link-pontos">
                    <i class="ph ph-devices"></i> Pontos de Acesso
                </a>
            </nav>
        </aside>
    `;
}

function getTopbarHTML() {
    return `
        <header class="topbar">
            <div style="display:flex; align-items:center;">
                <button class="mobile-menu-btn" onclick="toggleSidebar()">
                    <i class="ph ph-list"></i>
                </button>
                <h2 id="page-title" style="margin-left: 10px;">Painel</h2>
            </div>
            
            <div class="user-info">
                <button class="theme-toggle" onclick="toggleTheme()" title="Alternar Tema">
                    <i class="ph ph-moon" id="theme-icon"></i>
                </button>
                
                <button class="theme-toggle" onclick="handleLogout()" title="Sair do Sistema" style="color: var(--danger-color, #ef4444);">
                    <i class="ph ph-sign-out"></i>
                </button>
                
                <div class="user-profile" style="display: flex; align-items: center; gap: 8px;">
                    <span class="user-name" style="font-size: 0.9rem; font-weight: 600;">Admin</span>
                    <i class="ph ph-user-circle" style="font-size: 24px;"></i>
                </div>
            </div>
        </header>
    `;
}

// --- Lógica de Logout (NOVO) ---
async function handleLogout() {
    if (!window.sb) return;

    const confirmacao = confirm("Deseja realmente sair do sistema?");
    if (confirmacao) {
        try {
            const { error } = await window.sb.auth.signOut();
            if (error) throw error;
            
            // Redireciona para login após sair
            window.location.href = '../../pages/login/index.html';
        } catch (err) {
            alert("Erro ao sair: " + err.message);
        }
    }
}

// --- Lógica de Tema ---
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

function updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if(icon) {
        icon.className = isDark ? 'ph ph-sun' : 'ph ph-moon';
    }
}

// --- Responsividade Mobile ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay-mobile'); // Se houver overlay
    if(sidebar) sidebar.classList.toggle('active');
}

// Marca link ativo
function highlightCurrentPage() {
    const path = window.location.pathname;
    // Pequeno delay para garantir que o HTML foi injetado
    setTimeout(() => {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href').replace('..', ''); 
            // Lógica simples de match da URL
            if (path.includes(href.split('/')[2])) { 
                link.classList.add('active');
            }
        });
    }, 50);
}