const express = require('express');
const reporteController = require('../controllers/reporteController');
const router = express.Router();

router.get('/:abogadoId', reporteController.generarReporte);

module.exports = router;
