const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let tasks = [];
let idCounter = 1;

// ✅ Rota para obter todas as tarefas
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ✅ Rota para adicionar uma nova tarefa
app.post("/tasks", (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Texto obrigatório!" });

    const newTask = { id: idCounter++, text };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// ✅ Rota para deletar uma tarefa
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: "Tarefa removida" });
});

// ✅ Iniciar servidor
app.listen(3000, () => console.log("Server running on port 3000"));
