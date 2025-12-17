/* ============================================================
   ARQUIVO: assets/js/components.js
   Responsável por desenhar a Sidebar e Topbar em todas as páginas
   ============================================================ */

function renderLayout() {
    // 1. INJETAR SIDEBAR
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <h2>
                        <i class="material-icons-round logo-icon">grid_view</i>
                        <span>Pandda</span>
                    </h2>
                </div>
                
                <ul class="sidebar-menu">
                    <li>
                        <a href="/pages/dashboard/index.html" data-page="dashboard">
                            <i class="material-icons-round">dashboard</i> 
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/pages/clientes/index.html" data-page="clientes">
                            <i class="material-icons-round">people</i> 
                            <span>Clientes</span>
                        </a>
                    </li>
                    <li>
                        <a href="/pages/apps/index.html" data-page="apps">
                            <i class="material-icons-round">android</i> 
                            <span>Apps</span>
                        </a>
                    </li>
                    <li>
                        <a href="/pages/servidores/index.html" data-page="servidores">
                            <i class="material-icons-round">dns</i> 
                            <span>Servidores</span>
                        </a>
                    </li>
                    <li>
                        <a href="/pages/planos/index.html" data-page="planos">
                            <i class="material-icons-round">payments</i> 
                            <span>Planos</span>
                        </a>
                    </li>
                </ul>
            </aside>
            <div class="sidebar-overlay" id="sidebar-overlay"></div>
        `;
    }

    // 2. INJETAR TOPBAR (Agora inclui o título da página dinamicamente se quiser)
    const topbarContainer = document.getElementById('topbar-container');
    if (topbarContainer) {
        // Pega o título definido numa tag meta ou data attribute, ou usa padrão
        const pageTitle = document.body.getAttribute('data-title') || 'Pandda Admin';

        topbarContainer.innerHTML = `
            <header class="topbar">
                <div class="topbar-left">
                    <div class="toggle-btn" id="sidebar-toggle">
                        <i class="material-icons-round">menu</i>
                    </div>
                    <h2 style="font-size: 18px; font-weight: 600; margin-left: 10px;">${pageTitle}</h2>
                </div>
                
                <div class="topbar-right">
                    <button class="action-btn" id="theme-toggle" title="Alternar Tema">
                        <i class="material-icons-round" id="theme-icon">dark_mode</i>
                    </button>

                    <div style="width: 1px; height: 24px; background: var(--border-color);"></div>

                    <div class="user-info">
                        <div class="user-details">
                            <span class="user-name">Admin</span>
                        </div>
                        <div class="user-avatar">A</div>
                    </div>

                    <button class="action-btn logout-btn" id="btn-logout" title="Sair">
                        <i class="material-icons-round">logout</i>
                    </button>
                </div>
            </header>
        `;
    }

    // 3. MARCAR LINK ATIVO AUTOMATICAMENTE
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.sidebar-menu a');
    
    links.forEach(link => {
        // Remove active anterior
        link.classList.remove('active');
        
        // Verifica se a URL atual contém a chave do link (ex: "clientes")
        const pageKey = link.getAttribute('data-page');
        if (currentPath.includes(pageKey)) {
            link.classList.add('active');
        }
    });
}