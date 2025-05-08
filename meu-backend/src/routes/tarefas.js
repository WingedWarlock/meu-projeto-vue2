const express = require("express");
const router = express.Router();

let tarefas = [];
let id = 1;

router.get("/", (req, res) => {
  res.json(tarefas);
});

router.post("/", (req, res) => {
  const nova = {
    id: id++,
    descricao: req.body.descricao,
    concluida: false,
  };
  tarefas.push(nova);
  res.status(201).json(nova);
});

router.put("/:id", (req, res) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).send("Não encontrada");

  tarefa.concluida = req.body.concluida;
  res.json(tarefa);
});

router.delete("/:id", (req, res) => {
  tarefas = tarefas.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;