// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Login form -> redireciona para dashboard (simulação)
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#login-email').value.trim();
      const pass = document.querySelector('#login-password').value.trim();
      if (!email || !pass) {
        alert('Preencha e-mail e senha.');
        return;
      }
      // Simulação: redireciona para dashboard
      window.location.href = 'dashboard.html';
    });
  }

  // Forgot password
  const forgotForm = document.querySelector('#forgot-form');
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#forgot-email').value.trim();
      if (!email) { alert('Informe seu e-mail'); return; }
      // Simulação: mostra feedback
      const feedback = document.querySelector('#forgot-feedback');
      if (feedback) {
        feedback.classList.remove('hidden');
      } else {
        alert('Link de recuperação enviado! (simulado)');
      }
    });
  }

  // Profile save (simulado)
  const profileForm = document.querySelector('#profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fb = document.querySelector('#profile-feedback');
      if (fb) {
        fb.classList.remove('hidden');
        setTimeout(() => fb.classList.add('hidden'), 3500);
      } else {
        alert('Perfil salvo (simulado)');
      }
    });
  }

  // Dashboard: menu switching
  const menu = document.querySelector('#menu');
  if (menu) {
    menu.addEventListener('click', (ev) => {
      const item = ev.target.closest('.sidebar-item');
      if (!item) return;
      // set active class
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const section = item.getAttribute('data-section');
      document.querySelectorAll('.section-panel').forEach(panel => {
        const name = panel.getAttribute('data-name');
        if (name === section) panel.classList.remove('hidden');
        else panel.classList.add('hidden');
      });
      // scroll-to-top small UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile: toggle sidebar
  const toggleBtn = document.querySelector('#toggle-sidebar');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const sb = document.getElementById('sidebar');
      if (!sb) return;
      if (sb.classList.contains('hidden')) sb.classList.remove('hidden');
      else sb.classList.add('hidden');
    });
  }
});
