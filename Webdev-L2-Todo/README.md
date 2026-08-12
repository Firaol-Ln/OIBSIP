# To-Do Web App – OIBSIP Task 3

An interactive to-do list app with add, complete, edit, and delete functionality, built for the Oasis Infobyte Web Development Internship (Task 3).

## 🔗 Live Demo
[Add your deployed link here]

## Feature Checklist
- [x] Input field + "Add Task" button
- [x] New tasks appear immediately in Pending Tasks
- [x] "Mark Complete" toggle moves tasks to Completed Tasks
- [x] Inline Edit — click Edit, modify text, Save (or press Enter)
- [x] Delete button removes a task from either list
- [x] Live "X pending" / "Y completed" counters
- [x] Bonus: timestamp shown for when a task was added or completed
- [x] Bonus: tasks persist across refreshes via `localStorage`
- [x] Friendly empty-state message when a list has no items

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (no libraries/frameworks)

## How It Works
- Tasks are stored as an array of objects (`id`, `text`, `completed`, `createdAt`, `completedAt`) in a single JS variable, and mirrored to `localStorage` on every change so nothing is lost on refresh.
- `render()` re-draws both lists from that array whenever anything changes — a single source of truth rather than manually patching the DOM in multiple places.
- A `<template>` element defines the markup for one task row; JS clones it per task, which keeps the HTML clean and avoids building markup with string concatenation.
- All interactivity uses `addEventListener` — no inline `onclick`.
- Editing swaps a `<span>` for a text `<input>` in place, rather than opening a separate form, so it feels inline as required.

## Project Structure
```
todo-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run
Open `index.html` in any modern browser — no build step or dependencies required. Tasks will persist automatically between sessions via your browser's localStorage.