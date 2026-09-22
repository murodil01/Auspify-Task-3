const STORAGE_KEY = "daymark-tasks";

const state = {
  tasks: loadTasks(),
  filter: "all"
};

const elements = {
  dateLabel: document.querySelector("#dateLabel"),
  taskForm: document.querySelector("#taskForm"),
  taskInput: document.querySelector("#taskInput"),
  taskList: document.querySelector("#taskList"),
  emptyState: document.querySelector("#emptyState"),
  emptyTitle: document.querySelector("#emptyTitle"),
  emptyCopy: document.querySelector("#emptyCopy"),
  taskCount: document.querySelector("#taskCount"),
  activeCount: document.querySelector("#activeCount"),
  allCount: document.querySelector("#allCount"),
  openCount: document.querySelector("#openCount"),
  doneCount: document.querySelector("#doneCount"),
  clearCompleted: document.querySelector("#clearCompleted"),
  progressRing: document.querySelector("#progressRing"),
  progressPercent: document.querySelector("#progressPercent"),
  progressTitle: document.querySelector("#progressTitle"),
  progressCopy: document.querySelector("#progressCopy")
};

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTasks) ? savedTasks : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

function createTask(title) {
  return { id: crypto.randomUUID(), title, completed: false, createdAt: Date.now() };
}

function visibleTasks() {
  return state.tasks.filter((task) => {
    if (state.filter === "active") return !task.completed;
    if (state.filter === "completed") return task.completed;
    return true;
  });
}

function render() {
  const completedTasks = state.tasks.filter((task) => task.completed).length;
  const activeTasks = state.tasks.length - completedTasks;
  const percentage = state.tasks.length ? Math.round((completedTasks / state.tasks.length) * 100) : 0;
  const tasksToShow = visibleTasks();

  elements.dateLabel.textContent = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric" }).format(new Date());
  elements.taskCount.textContent = state.tasks.length;
  elements.activeCount.textContent = activeTasks;
  elements.allCount.textContent = state.tasks.length;
  elements.openCount.textContent = activeTasks;
  elements.doneCount.textContent = completedTasks;
  elements.progressPercent.textContent = `${percentage}%`;
  elements.progressRing.style.background = `conic-gradient(var(--sage-dark) ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg)`;
  elements.progressRing.style.borderColor = "transparent";
  elements.progressTitle.textContent = percentage === 100 && state.tasks.length ? "All wrapped up" : percentage ? `${percentage}% complete` : "A clear start";
  elements.progressCopy.textContent = state.tasks.length ? `${activeTasks} ${activeTasks === 1 ? "task" : "tasks"} still open.` : "Add a task to begin.";

  elements.taskList.replaceChildren(...tasksToShow.map(renderTask));
  elements.emptyState.hidden = tasksToShow.length > 0;
  if (!tasksToShow.length) updateEmptyState();

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.filter);
  });
}

function renderTask(task) {
  const item = document.createElement("article");
  item.className = `task-item${task.completed ? " is-complete" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.className = "task-check";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.completed ? "open" : "complete"}`);
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
    render();
  });

  const title = document.createElement("span");
  title.className = "task-text";
  title.textContent = task.title;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "×";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
  deleteButton.addEventListener("click", () => {
    state.tasks = state.tasks.filter((currentTask) => currentTask.id !== task.id);
    saveTasks();
    render();
  });

  item.append(checkbox, title, deleteButton);
  return item;
}

function updateEmptyState() {
  const messages = {
    all: ["Nothing on your list yet.", "A quiet list is a good place to begin."],
    active: ["You’re all caught up.", "Every task here is complete."],
    completed: ["No completed tasks yet.", "Finish a task and it will land here."]
  };
  const [title, copy] = messages[state.filter];
  elements.emptyTitle.textContent = title;
  elements.emptyCopy.textContent = copy;
}

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = elements.taskInput.value.trim();
  if (!title) return;
  state.tasks.unshift(createTask(title));
  saveTasks();
  elements.taskInput.value = "";
  state.filter = "all";
  render();
  elements.taskInput.focus();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    render();
  });
});

elements.clearCompleted.addEventListener("click", () => {
  state.tasks = state.tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

render();
