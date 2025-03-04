const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const API_URL = "http://localhost:3000/tasks";

// Buscar tarefas ao carregar a página
async function fetchTasks() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erro ao buscar tarefas!");

        const tasks = await res.json();
        taskList.innerHTML = "";
        tasks.forEach(task => createTaskElement(task));
    } catch (error) {
        console.error(error);
    }
}

// Adicionar tarefa
async function addTask() {
    const text = taskInput.value.trim();
    if (!text) return alert("Digite uma tarefa!");

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        if (!res.ok) throw new Error("Erro ao adicionar tarefa!");

        taskInput.value = "";
        fetchTasks(); // Atualiza a lista
    } catch (error) {
        console.error(error);
        alert("Erro ao adicionar tarefa!");
    }
}

// Criar item da lista
function createTaskElement(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${task.text}
        <button class="delete" onclick="deleteTask(${task.id})">X</button>
    `;
    taskList.appendChild(li);
}

// Deletar tarefa
async function deleteTask(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erro ao deletar tarefa!");
        fetchTasks();
    } catch (error) {
        console.error(error);
    }
}

addTaskBtn.addEventListener("click", addTask);
fetchTasks();
