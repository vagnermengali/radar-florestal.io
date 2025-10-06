document.addEventListener("DOMContentLoaded", () => {
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

    topics.forEach((topic) => {
      const div = document.createElement("div");
      div.className =
        "bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition";

      div.innerHTML = `
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${topic.title}</h3>
        <p class="text-gray-700">${topic.content}</p>
        <div class="text-sm text-gray-400 mt-2">
          <i class="far fa-clock"></i> ${new Date(topic.date).toLocaleString("pt-BR")}
        </div>
      `;

      topicsList.appendChild(div);
    });
  };

  confirmPost.addEventListener("click", () => {
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
