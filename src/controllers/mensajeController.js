const mensaje = require('../models/mensaje'); // Modelo Sequelize para mensajes

const handleMessageQueue = async (message) => {
    try {
        console.log('Procesando mensaje en message-queue:', message.content.toString());
        const { userId, contenido } = JSON.parse(message.content.toString());

        if (!userId || !contenido) {
            throw new Error('Datos incompletos para enviar mensaje.');
        }

        // Lógica real: Registrar el mensaje en la base de datos
        const nuevoMensaje = await Message.create({
            userId,
            contenido
        });

        console.log('Mensaje enviado con éxito:', nuevoMensaje);
    } catch (error) {
        console.error('Error en handleMessageQueue:', error.message);
    }
};

module.exports = { handleMessageQueue };