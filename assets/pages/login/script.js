// pages/login/script.js

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const btnSubmit = document.getElementById('btn-submit');
const togglePassBtn = document.getElementById('toggle-pass');

// Alternar visibilidade da senha
togglePassBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = togglePassBtn.querySelector('i');
    icon.classList.toggle('ph-eye');
    icon.classList.toggle('ph-eye-closed');
});

// Evento de Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Resetar estados
    errorMessage.style.display = 'none';
    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Autenticando...';

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Chamada ao Supabase Auth
        const { data, error } = await window.sb.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        // Sucesso!
        console.log('Login realizado:', data);
        
        // Redireciona para o Dashboard
        // Nota: O caminho volta 1 nível (pages) e entra em dashboard
        window.location.href = '../dashboard/index.html';

    } catch (error) {
        console.error('Erro de login:', error.message);
        errorMessage.querySelector('span').innerText = 'E-mail ou senha incorretos.';
        errorMessage.style.display = 'flex';
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Entrar no Sistema';
    }
});