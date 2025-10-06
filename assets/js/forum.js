document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const openSidebar = document.getElementById("openSidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  if (openSidebar) {
    openSidebar.addEventListener("click", () => {
      sidebar.classList.remove("-translate-x-full");
      sidebarBackdrop?.classList.remove("hidden");
    });
  }

  if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.add("-translate-x-full");
      sidebarBackdrop?.classList.add("hidden");
    });
  }

  sidebarBackdrop?.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    sidebarBackdrop.classList.add("hidden");
  });

  document.getElementById("profileBtn")?.addEventListener("click", () => {
    window.location.href = "/radar-florestal.io/profile.html";
  });
  document.getElementById("profileTopBtn")?.addEventListener("click", () => {
    window.location.href = "/radar-florestal.io/profile.html";
  });
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    window.location.href = "/radar-florestal.io";
  });

  document.querySelectorAll("#menuItems button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      if (section) window.location.href = `dashboard.html#${section}`;
    });
  });

  document.getElementById("meusAlertasBtn")?.addEventListener("click", () => {
    window.location.href = "/radar-florestal.io/meus-alertas.html";
  });

  const forumLink = document.querySelector('a[href="forum.html"]');
  if (forumLink) {
    forumLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/radar-florestal.io/forum.html";
    });
  }

  const topicsList = document.getElementById("topicsList");
  const postTitle = document.getElementById("postTitle");
  const postContent = document.getElementById("postContent");
  const confirmPost = document.getElementById("confirmPost");

  let topics = JSON.parse(localStorage.getItem("forumTopics")) || [
    {
      title: "Aumento de queimadas na Serra do Cipó",
      content:
        "Alguém mais percebeu um aumento nas queimadas nas últimas semanas? Estou coletando dados de satélite para comparar.",
      date: new Date("2025-09-20T14:35:00").toISOString(),
    },
    {
      title: "Monitoramento de fauna silvestre",
      content:
        "Estou desenvolvendo um projeto de armadilhas fotográficas. Alguém tem interesse em colaborar com análise de imagens?",
      date: new Date("2025-09-25T10:12:00").toISOString(),
    },
    {
      title: "Denúncia de desmatamento irregular",
      content:
        "Há uma área próxima à trilha da Usina Velha que parece estar sendo desmatada. Alguém confirma?",
      date: new Date("2025-09-30T08:47:00").toISOString(),
    },
  ];

  const renderTopics = () => {
    topicsList.innerHTML = "";
    if (topics.length === 0) {
      topicsList.innerHTML = `<p class="text-gray-500 text-center">Nenhum tópico criado ainda.</p>`;
      return;
    }

    topics.forEach((topic, index) => {
      const div = document.createElement("div");
      div.className =
        "bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition flex justify-between items-start";

      div.innerHTML = `
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">${topic.title}</h3>
          <p class="text-gray-700">${topic.content}</p>
          <div class="text-sm text-gray-400 mt-2">
            <i class="far fa-clock"></i> ${new Date(topic.date).toLocaleString("pt-BR")}
          </div>
        </div>
        <div class="flex gap-2 ml-4">
          <button class="editBtn text-blue-600 hover:text-blue-800" data-index="${index}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="deleteBtn text-red-600 hover:text-red-800" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;

      topicsList.appendChild(div);
    });

    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = e.currentTarget.dataset.index;
        if (confirm("Deseja realmente deletar este tópico?")) {
          topics.splice(i, 1);
          localStorage.setItem("forumTopics", JSON.stringify(topics));
          renderTopics();
        }
      });
    });

    document.querySelectorAll(".editBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = e.currentTarget.dataset.index;
        postTitle.value = topics[i].title;
        postContent.value = topics[i].content;

        topics.splice(i, 1);
        localStorage.setItem("forumTopics", JSON.stringify(topics));
        renderTopics();
      });
    });
  };

  confirmPost?.addEventListener("click", () => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (!title || !content) {
      alert("Por favor, preencha o título e o conteúdo do tópico.");
      return;
    }

    const newTopic = {
      title,
      content,
      date: new Date().toISOString(),
    };

    topics.unshift(newTopic);
    localStorage.setItem("forumTopics", JSON.stringify(topics));

    postTitle.value = "";
    postContent.value = "";

    renderTopics();
  });

  renderTopics();
});
