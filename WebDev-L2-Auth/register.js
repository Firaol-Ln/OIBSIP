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

  // Basic form validation
  if (!identifier || !password || !confirm) {
    showError("Please fill in every field before submitting.");
    return;
  }

  // Check password requirements
  if (!isPasswordValid(password)) {
    showError(
      "Password must be at least 8 characters and include at least 1 number.",
    );
    return;
  }

  // Check password confirmation
  if (password !== confirm) {
    showError("Passwords do not match.");
    return;
  }

  // Check if user already exists
  if (findUser(identifier)) {
    showError("An account with that username or email already exists.");
    return;
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Get existing users
  const users = getUsers();

  // Add new user
  users.push({
    identifier: identifier,
    passwordHash: passwordHash,
    createdAt: new Date().toISOString(),
  });

  // Save users
  saveUsers(users);

  showSuccess("Account created! Redirecting you to login...");

  registerForm.reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
});
