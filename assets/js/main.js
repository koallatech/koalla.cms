// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
    checkTheme();
});

async function loadComponents() {
    // Carrega Sidebar
    const sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer) {
        // Simulação do HTML da sidebar (em produção você usaria fetch para um arquivo .html separado)
        sidebarContainer.innerHTML = getSidebarHTML(); 
    }

    // Carrega Topbar
    const topbarContainer = document.getElementById("topbar-container");
    if (topbarContainer) {
        topbarContainer.innerHTML = getTopbarHTML();
        setupTopbarEvents(); // Ativa botões da topbar após carregar
    }
    
    highlightCurrentPage();
}

function getSidebarHTML() {
    return `
        <aside class="sidebar">
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
            <button class="mobile-menu-btn" onclick="toggleSidebar()">
                <i class="ph ph-list"></i>
            </button>
            <h2 id="page-title">Painel</h2>
            <div class="user-info">
                <button class="theme-toggle" onclick="toggleTheme()">
                    <i class="ph ph-moon" id="theme-icon"></i>
                </button>
                <span>Admin</span>
                <i class="ph ph-user-circle" style="font-size: 24px;"></i>
            </div>
        </header>
    `;
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
    const sidebar = document.getElementById('sidebar-container');
    sidebar.classList.toggle('active');
}

// Marca o link ativo na sidebar baseado na URL atual
function highlightCurrentPage() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        if (path.includes(link.getAttribute('href').replace('..', ''))) {
            link.classList.add('active');
        }
    });
}

function setupTopbarEvents() {
    // Reatribui eventos se necessário após inserção no DOM
}