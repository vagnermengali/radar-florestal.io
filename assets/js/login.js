const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");
const errorText = document.getElementById("errorText");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Entrando...";
  errorMsg.classList.add("hidden");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (email === "admin@radarflorestal.com" && password === "123456") {
    window.location.href = "dashboard.html";
  } else {
    errorText.textContent = "Email ou senha incorretos";
    errorMsg.classList.remove("hidden");
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Entrar";
});
