const express = require("express");
const router = express.Router();
const {
  createEvaluation,
  getEvaluationsByConsulta,
} = require("../controllers/evaluationController");

// Ruta para crear una evaluación
router.post("/", createEvaluation);

// Ruta para obtener evaluaciones por consulta
router.get("/:consultaId", getEvaluationsByConsulta);

module.exports = router;