const express = require("express");
const router = express.Router();
const {
  createAgenda,
  getAgendaByAbogado,
} = require("../controllers/agendaController");

// Ruta para crear una agenda
router.post("/", createAgenda);

// Ruta para obtener las agendas de un abogado
router.get("/:abogadoId", getAgendaByAbogado);

module.exports = router;