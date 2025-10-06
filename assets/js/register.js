const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");
const avatarPlaceholder = document.getElementById("avatarPlaceholder");

if (avatarInput) {
  avatarInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.src = e.target.result;
        avatarPreview.classList.remove("hidden");
        avatarPlaceholder.classList.add("hidden");
      };
      reader.readAsDataURL(file);
    }
  });
}

const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!name || !email || !pass || !confirm) {
      showError("Preencha todos os campos.");
      return;
    }

    if (pass.length < 6) {
      showError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (pass !== confirm) {
      showError("As senhas não coincidem.");
      return;
    }

    hideError();
    showSuccess();

    setTimeout(() => {
      window.location.href = "/radar-florestal.io/login.html";
    }, 1500);
  });
}

function showError(text) {
  errorMsg.querySelector("#errorText").textContent = text;
  errorMsg.classList.remove("hidden");
  successMsg.classList.add("hidden");
}

function hideError() {
  errorMsg.classList.add("hidden");
}

function showSuccess() {
  successMsg.classList.remove("hidden");
}
