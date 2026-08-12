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
