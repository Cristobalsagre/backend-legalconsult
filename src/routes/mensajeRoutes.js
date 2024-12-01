const express = require('express');
const router = express.Router();
const { enviarMensaje } = require('../bus/bus'); // Ajusta según tu configuración

router.post('/enviar', async (req, res) => {
    const { queue, message } = req.body;
    try {
        await enviarMensaje(queue, message);
        res.status(200).send({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

module.exports = router;