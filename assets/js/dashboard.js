const user = { name: "João Silva", email: "joao@example.com" };
document.getElementById("userName").textContent = `Olá, ${user.name}`;
document.getElementById("userEmail").textContent = user.email;

const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");

document.getElementById("openSidebar").addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
  sidebarBackdrop.classList.remove("hidden");
});
document.getElementById("closeSidebar").addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  sidebarBackdrop.classList.add("hidden");
});
sidebarBackdrop.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  sidebarBackdrop.classList.add("hidden");
});

const sections = {
  desmatamento: {
    title: "Monitoramento de Desmatamento",
    description: "Dados e análises sobre o desmatamento em tempo real",
    stats: [
      { label: "Área Desmatada (último mês)", value: "1.245 km²", trend: "up" },
      { label: "Alertas Ativos", value: "127", trend: "down" },
      { label: "Áreas Monitoradas", value: "34", trend: "stable" },
    ],
  },
  queimadas: {
    title: "Monitoramento de Queimadas",
    description: "Focos de calor e incêndios florestais identificados",
    stats: [
      { label: "Focos Ativos", value: "89", trend: "up" },
      { label: "Área Queimada (24h)", value: "567 ha", trend: "down" },
      { label: "Risco Alto", value: "12 regiões", trend: "up" },
    ],
  },
  mineracao: {
    title: "Impactos da Mineração",
    description: "Monitoramento de atividades minerárias e seus efeitos ambientais",
    stats: [
      { label: "Áreas de Mineração", value: "23", trend: "stable" },
      { label: "Impacto Ambiental", value: "Médio", trend: "down" },
      { label: "Licenças Ativas", value: "45", trend: "up" },
    ],
  },
  fauna: {
    title: "Preservação da Fauna",
    description: "Monitoramento de espécies e biodiversidade",
    stats: [
      { label: "Espécies Monitoradas", value: "156", trend: "up" },
      { label: "Em Risco Crítico", value: "8", trend: "stable" },
      { label: "Avistamentos (semana)", value: "2.340", trend: "up" },
    ],
  },
};

const content = document.getElementById("content");
let activeSection = "desmatamento";

const modal = document.getElementById("alertModal");
const modalTitle = document.getElementById("modalTitle");
const modalInput = document.getElementById("modalInput");
const modalCancel = document.getElementById("modalCancel");
const modalConfirm = document.getElementById("modalConfirm");
let modalCallback = null;

function openModal(title, defaultValue = "", callback) {
  modalTitle.textContent = title;
  modalInput.value = defaultValue;
  modal.classList.remove("hidden");
  modalCallback = callback;
  modalInput.focus();
}

modalCancel.addEventListener("click", () => modal.classList.add("hidden"));
modalConfirm.addEventListener("click", () => {
  modal.classList.add("hidden");
  if (modalCallback) modalCallback(modalInput.value);
});

function setActiveMenu(sectionKey) {
  document.querySelectorAll("#menuItems button").forEach((btn) => {
    if (btn.dataset.section === sectionKey) {
      btn.classList.add("bg-white/20", "text-white");
    } else {
      btn.classList.remove("bg-white/20", "text-white");
    }
  });
}

function renderSection(sectionKey) {
  const section = sections[sectionKey];
  content.innerHTML = `
    <div class="space-y-8">
      <!-- Cabeçalho -->
      <div class="border-b border-gray-200 pb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">${section.title}</h1>
        <p class="text-gray-500 text-lg">${section.description}</p>
      </div>

      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${section.stats
          .map(
            (stat) => `
          <div class="bg-white rounded-xl p-6 shadow">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium text-gray-700">${stat.label}</h3>
              ${
                stat.trend === "up"
                  ? '<i class="fas fa-arrow-up text-red-500"></i>'
                  : stat.trend === "down"
                  ? '<i class="fas fa-arrow-down text-green-500"></i>'
                  : '<i class="fas fa-arrows-alt-h text-yellow-500"></i>'
              }
            </div>
            <p class="text-2xl font-bold text-green-600">${stat.value}</p>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Botão Adicionar Alertas (acima do mapa) -->
      <div class="flex justify-end">
        <button id="addAlertBtn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-4">
          <i class="fas fa-plus mr-2"></i>Novo Alerta
        </button>
      </div>

      <!-- Mapa -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Mapa da Região</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.123456789012!2d-43.921137!3d-19.9678913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa698451d9994ad:0xd639ebec4ddb6f17!2sSerra+do+Curral!5e0!3m2!1spt-BR!2sbr!4v1631234567890"
          width="100%"
          height="400"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <!-- Alertas da Comunidade -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Alertas da Comunidade</h2>
        <div class="space-y-4">
          <div class="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p class="font-medium text-gray-700">Queimada detectada em área rural</p>
              <p class="text-sm text-gray-500">Postado por Maria - 2h atrás</p>
            </div>
            <span class="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600">Crítico</span>
          </div>
          <div class="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p class="font-medium text-gray-700">Avistamento de fauna ameaçada</p>
              <p class="text-sm text-gray-500">Postado por Carlos - 5h atrás</p>
            </div>
            <span class="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600">Moderado</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Evento do botão Adicionar Alertas
  document.getElementById("addAlertBtn").addEventListener("click", () => {
    openModal("Digite o título do alerta:", "", (value) => {
      if (value) {
        // Aqui você pode enviar o alerta para a comunidade ou salvar
        alert(`Alerta criado: ${value}`);
      }
    });
  });

  setActiveMenu(sectionKey);
}

renderSection(activeSection);

document.querySelectorAll("#menuItems button").forEach((btn) => {
  btn.addEventListener("click", () => {
    activeSection = btn.dataset.section;
    renderSection(activeSection);
    sidebar.classList.add("-translate-x-full");
    sidebarBackdrop.classList.add("hidden");
  });
});

document
  .getElementById("profileBtn")
  .addEventListener("click", () => (window.location.href = "/radar-florestal.io/profile.html"));
document
  .getElementById("profileTopBtn")
  .addEventListener("click", () => (window.location.href = "/radar-florestal.io/profile.html"));
document
  .getElementById("logoutBtn")
  .addEventListener("click", () => (window.location.href = "/radar-florestal.io"));

document.getElementById("meusAlertasBtn")?.addEventListener("click", () => {
  window.location.href = "/radar-florestal.io/my-alerts.html";
});

document.querySelector('a[href="/radar-florestal.io/forum.html"]')?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/radar-florestal.io/forum.html";
});
