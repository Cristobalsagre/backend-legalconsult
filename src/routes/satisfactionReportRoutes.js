const express = require("express");
const router = express.Router();
const { generateSatisfactionReport } = require("../controllers/satisfactionReportController");

// Ruta para generar el reporte de satisfacción
router.post("/", generateSatisfactionReport);

module.exports = router;