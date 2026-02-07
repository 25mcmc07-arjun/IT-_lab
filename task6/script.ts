interface Task {
  text: string;
  completed: boolean;
  due: string;
}

let tasks: Task[] = [];
let filter: string = "all";

function addTask(): void {
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;

  if (taskInput.value === "" || dueDateInput.value === "") {
    alert("Enter task and date");
    return;
  }

  tasks.push({
    text: taskInput.value,
    completed: false,
    due: dueDateInput.value
  });

  taskInput.value = "";
  dueDateInput.value = "";

  displayTasks();
}

function displayTasks(): void {
  const list = document.getElementById("taskList") as HTMLUListElement;
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (
      (filter === "completed" && !task.completed) ||
      (filter === "pending" && task.completed)
    ) continue;

    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleTask(${i})">
        ${task.text}<br>
        <small>Due: ${task.due}</small>
      </span>
      <button onclick="removeTask(${i})">X</button>
    `;
    list.appendChild(li);
  }
}

function toggleTask(index: number): void {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function removeTask(index: number): void {
  tasks.splice(index, 1);
  displayTasks();
}

function filterTasks(type: string): void {
  filter = type;
  displayTasks();
}

// expose functions
(window as any).addTask = addTask;
(window as any).toggleTask = toggleTask;
(window as any).removeTask = removeTask;
(window as any).filterTasks = filterTasks;
