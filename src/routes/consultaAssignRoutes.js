const express = require('express');
const router = express.Router();
const { createConsulta, getConsultaById } = require('../controllers/consultaAssignController');

// Ruta para asignar un abogado a una consulta
router.post('/assign', async (req, res) => {
    try {
        await createConsulta(req, res);
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

// Ruta para obtener información de una consulta por ID
router.get('/:id', async (req, res) => {
    try {
        await getConsultaById(req, res);
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

module.exports = router;