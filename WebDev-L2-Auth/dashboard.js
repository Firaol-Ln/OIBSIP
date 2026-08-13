const session = getSession();

if (!session) {
  window.location.href = "login.html";
} else {
  document.getElementById("userLabel").textContent = session.identifier;
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  clearSession();
  window.location.href = "login.html";
});
