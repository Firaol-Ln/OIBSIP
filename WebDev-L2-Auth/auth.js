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
