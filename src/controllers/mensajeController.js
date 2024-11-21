const Mensaje = require('../models/mensaje');

const enviarMensaje = async (req, res) => {
    try {
        const { consultaId, remitenteId, contenido } = req.body;

        const mensaje = await Mensaje.create({ consultaId, remitenteId, contenido });

        res.json({ message: "Mensaje enviado correctamente", mensaje });
    } catch (error) {
        res.status(500).json({ message: "Error al enviar mensaje", error: error.message });
    }
};

const obtenerMensajes = async (req, res) => {
    try {
        const { consultaId } = req.params;

        const mensajes = await Mensaje.findAll({ where: { consultaId } });

        res.json({ mensajes });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener mensajes", error: error.message });
    }
};

module.exports = { enviarMensaje, obtenerMensajes };
