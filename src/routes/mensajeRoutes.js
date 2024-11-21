const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const router = express.Router();

router.post('/', mensajeController.enviarMensaje);
router.get('/:consultaId', mensajeController.obtenerMensajes);

module.exports = router;
