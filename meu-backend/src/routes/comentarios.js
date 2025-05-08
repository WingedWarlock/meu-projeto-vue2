const express = require("express");
const router = express.Router();

let comentarios = [];
let id = 1;

router.get("/", (req, res) => {
  res.json(comentarios);
});

router.post("/", (req, res) => {
  const novo = {
    id: id++,
    name: req.body.name,
    message: req.body.message
  };
  comentarios.push(novo);
  res.status(201).json(novo);
});

router.delete("/:id", (req, res) => {
  comentarios = comentarios.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;