const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  const activeTasks = tasks.filter((task) => !task.completed).length;

  counter.textContent = `${activeTasks} tugas tersisa`;
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.className = "task-item";

    li.setAttribute("draggable", true);

    li.dataset.index = index;

    li.innerHTML = `

      <div class="task-left">

        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
        >

        <span class="
          task-text
          ${task.completed ? "completed" : ""}
        ">
          ${task.text}
        </span>

        <span class="
          priority
          ${task.priority.toLowerCase()}
        ">
          ${task.priority}
        </span>

      </div>

      <button class="delete-btn">
        Hapus
      </button>

    `;

    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;

      saveTasks();
      renderTasks();
    });

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);

      saveTasks();
      renderTasks();
    });

    const textElement = li.querySelector(".task-text");

    textElement.addEventListener("dblclick", () => {
      const input = document.createElement("input");

      input.type = "text";

      input.value = task.text;

      input.className = "edit-input";

      textElement.replaceWith(input);

      input.focus();

      function saveEdit() {
        const newValue = input.value.trim();

        if (newValue.length >= 3 && newValue.length <= 100) {
          task.text = newValue;

          saveTasks();
          renderTasks();
        }
      }

      input.addEventListener("blur", saveEdit);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        }
      });
    });

    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");

      saveTasks();
    });

    taskList.appendChild(li);
  });

  updateCounter();
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  const priority = priorityInput.value;

  if (text === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  if (text.length < 3) {
    alert("Minimal 3 karakter!");
    return;
  }

  if (text.length > 100) {
    alert("Maksimal 100 karakter!");
    return;
  }

  tasks.push({
    text: text,
    priority: priority,
    completed: false,
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks();
  });
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);

  saveTasks();
  renderTasks();
});

taskList.addEventListener("dragover", (e) => {
  e.preventDefault();

  const dragging = document.querySelector(".dragging");

  const siblings = [...taskList.querySelectorAll(".task-item:not(.dragging)")];

  const nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  taskList.insertBefore(dragging, nextSibling);
});

renderTasks();
