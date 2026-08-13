const registerForm = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const regPassword = document.getElementById("regPassword");
const regConfirm = document.getElementById("regConfirm");
const registerError = document.getElementById("registerError");
const registerSuccess = document.getElementById("registerSuccess");

function showError(message) {
  registerSuccess.classList.remove("visible");
  registerError.textContent = message;
  registerError.classList.add("visible");
}

function showSuccess(message) {
  registerError.classList.remove("visible");
  registerSuccess.textContent = message;
  registerSuccess.classList.add("visible");
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = usernameInput.value.trim();
  const password = regPassword.value;
  const confirm = regConfirm.value;

  // Basic form validation — no empty submissions
  if (!identifier || !password || !confirm) {
    showError("Please fill in every field before submitting.");
    return;
  }

  if (!isPasswordValid(password)) {
    showError(
      "Password must be at least 8 characters and include at least 1 number.",
    );
    return;
  }

  if (password !== confirm) {
    showError("Passwords do not match.");
    return;
  }

  if (findUser(identifier)) {
    showError("An account with that username or email already exists.");
    return;
  }

  // Store the user with a hashed password — never plain text
  const passwordHash = await hashPassword(password);
  const users = getUsers();
  users.push({ identifier, passwordHash, createdAt: new Date().toISOString() });
  saveUsers(users);

  showSuccess("Account created! Redirecting you to login...");
  registerForm.reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
});
