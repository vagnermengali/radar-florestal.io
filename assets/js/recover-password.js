const form = document.getElementById("forgotForm");
const successMsg = document.getElementById("successMsg");
const submitBtn = document.getElementById("submitBtn");
const userEmail = document.getElementById("userEmail");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  const email = document.getElementById("email").value;
  await new Promise((resolve) => setTimeout(resolve, 2000));

  form.classList.add("hidden");
  userEmail.textContent = email;
  successMsg.classList.remove("hidden");
});
