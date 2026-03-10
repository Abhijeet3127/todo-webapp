let tasks = [];
let nextId = 1;

const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const emptyMsg = document.getElementById('empty-msg');

function renderTasks() {
    taskList.innerHTML = '';
    emptyMsg.style.display = tasks.length === 0 ? 'block' : 'none';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(task.id));

        const text = document.createElement('input');
        text.type = 'text';
        text.className = 'task-text';
        text.value = task.text;
        text.readOnly = true;

        text.addEventListener('click', () => {
            text.readOnly = false;
            text.focus();
            text.select();
        });

        text.addEventListener('blur', () => {
            const trimmed = text.value.trim();
            if (trimmed) {
                editTask(task.id, trimmed);
            } else {
                text.value = task.text;
            }
            text.readOnly = true;
        });

        text.addEventListener('keydown', e => {
            if (e.key === 'Enter') text.blur();
            if (e.key === 'Escape') {
                text.value = task.text;
                text.readOnly = true;
                text.blur();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.push({ id: nextId++, text, completed: false });
    taskInput.value = '';
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    renderTasks();
}

function editTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task) task.text = newText;
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});

renderTasks();
