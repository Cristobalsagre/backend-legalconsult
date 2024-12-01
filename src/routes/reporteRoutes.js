const express = require('express');
const { createReporte } = require('../controllers/reporteController');
const router = express.Router();

// Rutas
router.post('/', createReporte); // Aquí se asegura de que createReporte sea una función válida

module.exports = router;