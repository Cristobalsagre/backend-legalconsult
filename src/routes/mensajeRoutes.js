const express = require('express');
const router = express.Router();
const { enviarMensaje } = require('../controllers/mensajeController');

router.post('/enviar', enviarMensaje);

module.exports = router;