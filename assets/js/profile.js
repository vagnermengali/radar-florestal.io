const user = {
  name: "João Silva",
  email: "joao@example.com",
  profileImage: "",
};

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const profileImg = document.getElementById("profileImg");
const profilePlaceholder = document.getElementById("profilePlaceholder");
const successMsg = document.getElementById("successMsg");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const backBtn = document.getElementById("backBtn");
const imageUpload = document.getElementById("imageUpload");

nameInput.value = user.name;
emailInput.value = user.email;
if (user.profileImage) {
  profileImg.src = user.profileImage;
  profileImg.classList.remove("hidden");
  profilePlaceholder.classList.add("hidden");
}

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
      profileImg.classList.remove("hidden");
      profilePlaceholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  saveBtn.disabled = true;
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

  await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate API

  user.name = nameInput.value;
  user.email = emailInput.value;

  successMsg.classList.remove("hidden");

  saveBtn.disabled = false;
  saveBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';

  setTimeout(() => successMsg.classList.add("hidden"), 3000);
});

cancelBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
backBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
