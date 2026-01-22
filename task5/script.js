let tasks = [];
let filter = "all";

function addTask() {
  const taskText = document.getElementById("taskInput").value;
  const dueDate = document.getElementById("dueDate").value;

  if (taskText === "" || dueDate === "") return;

  tasks.push({
    text: taskText,
    completed: false,
    due: new Date(dueDate)
  });

  tasks.sort((a, b) => a.due - b.due);

  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";

  displayTasks();
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      filter === "completed" && !task.completed ||
      filter === "pending" && task.completed
    ) return;

    const li = document.createElement("li");

    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${index})">
        ${task.text} <br>
        <small>Due: ${task.due.toDateString()}</small>
      </span>
      <button onclick="removeTask(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function filterTasks(type) {
  filter = type;
  displayTasks();
}
