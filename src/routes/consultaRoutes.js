const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

// Ruta para crear una consulta
router.post('/', consultaController.createConsulta);

// Ruta para obtener todas las consultas
router.get('/', consultaController.getAllConsultas);

// Ruta para obtener una consulta por ID
router.get('/:id', consultaController.getConsultaById);

// Ruta para actualizar una consulta por ID
router.put('/:id', consultaController.updateConsultaById);

// Ruta para eliminar una consulta por ID
router.delete('/:id', consultaController.deleteConsultaById);

module.exports = router;
