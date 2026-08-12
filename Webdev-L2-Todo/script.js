const STORAGE_KEY = "oibsip-todo-tasks";
let tasks = loadTasks();

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");
const template = document.getElementById("taskTemplate");

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read saved tasks:", err);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function formatTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function render() {
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  pending.forEach((task) => pendingList.appendChild(buildTaskElement(task)));
  completed.forEach((task) =>
    completedList.appendChild(buildTaskElement(task)),
  );

  pendingCount.textContent = `${pending.length} pending`;
  completedCount.textContent = `${completed.length} completed`;

  pendingEmpty.classList.toggle("visible", pending.length === 0);
  completedEmpty.classList.toggle("visible", completed.length === 0);
}

function buildTaskElement(task) {
  const node = template.content.firstElementChild.cloneNode(true);
  node.dataset.id = task.id;
  if (task.completed) node.classList.add("completed");

  const toggle = node.querySelector(".task-toggle");
  const text = node.querySelector(".task-text");
  const editInput = node.querySelector(".task-edit-input");
  const editBtn = node.querySelector(".edit-btn");
  const saveBtn = node.querySelector(".save-btn");
  const deleteBtn = node.querySelector(".delete-btn");
  const timestamp = node.querySelector(".task-timestamp");

  toggle.checked = task.completed;
  text.textContent = task.text;
  editInput.value = task.text;

  const label = task.completed
    ? `Completed ${formatTime(task.completedAt)}`
    : `Added ${formatTime(task.createdAt)}`;
  timestamp.textContent = label;

  toggle.addEventListener("change", () => toggleComplete(task.id));

  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  editBtn.addEventListener("click", () => {
    text.style.display = "none";
    editInput.style.display = "inline-block";
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    editInput.focus();
    editInput.select();
  });

  const commitEdit = () => {
    const newText = editInput.value.trim();
    if (newText) {
      updateTaskText(task.id, newText);
    } else {
      render();
    }
  };

  saveBtn.addEventListener("click", commitEdit);
  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") render();
  });

  return node;
}

function addTask(text) {
  tasks.unshift({
    id: generateId(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });
  saveTasks();
  render();
}

function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;
  saveTasks();
  render();
}

function updateTaskText(id, newText) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.text = newText;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

//init
render();