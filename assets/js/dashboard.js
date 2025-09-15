// dashboard.js
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
    description:
      "Monitoramento de atividades minerárias e seus efeitos ambientais",
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

let meusAlertas = [
  { titulo: "Desmatamento em área próxima", data: "10/09/2025" },
];

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

      <!-- Mapa -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Mapa da Região</h2>
        <div id="map" class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <span class="text-gray-500">[Mapa Interativo Aqui]</span>
        </div>
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

      <!-- Meus Alertas -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Meus Alertas</h2>
          <button id="addAlertBtn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <i class="fas fa-plus mr-2"></i>Novo Alerta
          </button>
        </div>
        <div id="meusAlertasList" class="space-y-4">
          ${meusAlertas
            .map(
              (alerta, index) => `
            <div class="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p class="font-medium text-gray-700">${alerta.titulo}</p>
                <p class="text-sm text-gray-500">Criado em ${alerta.data}</p>
              </div>
              <div class="flex gap-2">
                <button class="editAlert px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200" data-index="${index}">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button class="deleteAlert px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200" data-index="${index}">
                  <i class="fas fa-trash"></i> Excluir
                </button>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  document.getElementById("addAlertBtn").addEventListener("click", () => {
    openModal("Digite o título do alerta:", "", (value) => {
      if (value) {
        meusAlertas.push({
          titulo: value,
          data: new Date().toLocaleDateString("pt-BR"),
        });
        renderSection(activeSection);
      }
    });
  });

  document.querySelectorAll(".editAlert").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      openModal("Editar alerta:", meusAlertas[idx].titulo, (value) => {
        if (value) {
          meusAlertas[idx].titulo = value;
          renderSection(activeSection);
        }
      });
    });
  });

  document.querySelectorAll(".deleteAlert").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      openModal(
        "Deseja realmente excluir este alerta?",
        "Digite 'SIM' para confirmar",
        (value) => {
          if (value.toUpperCase() === "SIM") {
            meusAlertas.splice(idx, 1);
            renderSection(activeSection);
          }
        }
      );
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
  .addEventListener("click", () => (window.location.href = "/"));
