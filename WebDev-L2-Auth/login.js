const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

function showLoginError(message) {
  loginError.textContent = message;
  loginError.classList.add("visible");
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!identifier || !password) {
    showLoginError("Please enter both your username/email and password.");
    return;
  }

  const user = findUser(identifier);
  const passwordHash = await hashPassword(password);

  if (!user || user.passwordHash !== passwordHash) {
    showLoginError("Incorrect username/email or password.");
    return;
  }

  setSession(user.identifier);
  window.location.href = "dashboard.html";
});

// If already logged in

if (getSession()) {
  window.location.href = "dashboard.html";
}
