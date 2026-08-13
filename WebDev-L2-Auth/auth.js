const USERS_KEY = "oibsip-auth-users";
const SESSION_KEY = "oibsip-auth-session";
/*
 * Hash a password with SHA-256 using the browser's built-in Web Crypto API.
 * NOTE: this is a client-side demo only. Real applications must hash */

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read stored users:", err);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


function findUser(identifier) {
  const normalized = identifier.trim().toLowerCase();
  return getUsers().find((u) => u.identifier.toLowerCase() === normalized);
}

function setSession(identifier) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      identifier,
      loggedInAt: new Date().toISOString(),
    }),
  );
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isPasswordValid(password) {
  return password.length >= 8 && /\d/.test(password);
}
