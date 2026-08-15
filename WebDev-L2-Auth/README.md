# Authentication System – OIBSIP Task 4

A front-end-only authentication system (Option A) with registration, login, a protected dashboard, and logout — built with vanilla HTML, CSS, and JavaScript using `localStorage` as the data store.

## Feature Checklist
- [x] Registration page with username/email + password + "Register" button
- [x] Password validation: minimum 8 characters, at least 1 number
- [x] Duplicate username/email check with a clear error message
- [x] Login page with username/email + password + "Login" button
- [x] Incorrect credential handling — generic error, doesn't reveal which field was wrong
- [x] Protected dashboard page — redirects to `login.html` if opened without an active session
- [x] Logout button clears the session and redirects to login
- [x] Passwords are never stored in plain text — hashed with SHA-256 via the browser's Web Crypto API
- [x] Basic form validation on both pages — no empty submissions allowed

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (`localStorage` + `crypto.subtle`, no libraries)

## How It Works
- `auth.js` holds shared logic used by every page: hashing, reading/writing the `users` array in `localStorage`, and managing the current session (also stored in `localStorage`).
- **Registration**: validates the password rule and confirms the passwords match, checks for a duplicate identifier, then hashes the password with `crypto.subtle.digest('SHA-256', ...)` before saving — the plain-text password itself is never stored.
- **Login**: hashes whatever the user typed and compares it against the stored hash. If either the username or the hash doesn't match, the same generic "Incorrect username/email or password" message is shown either way, so an attacker can't tell which part was wrong.
- **Dashboard protection**: `dashboard.js` checks for a session at the very top of the script, before anything else renders. No session → immediate redirect to `login.html`. This means visiting `dashboard.html` directly, without logging in, always bounces you back.
- **Logout**: clears the session key from `localStorage` and redirects to login.

## ⚠️ Important Security Note
This uses client-side SHA-256 hashing to satisfy the assignment's "don't store plain text passwords" requirement for a front-end-only project. **This is not real-world security** — all the code runs in the browser and is fully visible to anyone, and SHA-256 without a server-side secret/salt can be reversed for common passwords via lookup tables. A production system would hash passwords server-side (e.g. bcrypt with Node/Express, per Option B) and never trust the client to handle credentials. This distinction is worth being able to explain in a project demo.

## Project Structure
```
auth-app/
├── index.html       # Registration page
├── login.html        # Login page
├── dashboard.html     # Protected page
├── auth.js            # Shared hashing/session helpers
├── register.js
├── login.js
├── dashboard.js
├── style.css
└── README.md
```

## How to Run
1. Open `index.html` to register an account.
2. You'll be redirected to `login.html` — log in with the same credentials.
3. You'll land on `dashboard.html`, which is only reachable while logged in.
4. Try opening `dashboard.html` directly in a new tab without logging in — you'll be redirected to login.
5. Click Logout to clear your session.
