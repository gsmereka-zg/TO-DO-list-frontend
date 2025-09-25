let tasks = [];
let editingIndex = null;

const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const statusInput = document.getElementById('status');
const taskList = document.getElementById('task-list');
const taskIdInput = document.getElementById('task-id');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = {
        id: taskIdInput.value || Date.now(),
        title: titleInput.value,
        description: descInput.value,
        status: statusInput.value
    };

    if (editingIndex === null) {
        // Criar nova
        tasks.push(task);
    } else {
        // Editar existente
        tasks[editingIndex] = task;
        editingIndex = null;
    }

    taskForm.reset();
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.status}</td>
      <td>
        <button class="edit">Editar</button>
        <button class="delete">Excluir</button>
      </td>
    `;

        row.querySelector('.edit').addEventListener('click', () => editTask(index));
        row.querySelector('.delete').addEventListener('click', () => deleteTask(index));

        taskList.appendChild(row);
    });
}

function editTask(index) {
    const task = tasks[index];
    titleInput.value = task.title;
    descInput.value = task.description;
    statusInput.value = task.status;
    taskIdInput.value = task.id;
    editingIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
