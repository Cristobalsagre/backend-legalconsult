const enviarMensaje = async (req, res) => {
    try {
        const { queue, message } = req.body;

        if (!queue || !message) {
            return res.status(400).json({ error: 'La cola y el mensaje son obligatorios' });
        }

        const channel = global.rabbitChannel;
        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(message));

        res.status(200).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
};

module.exports = { enviarMensaje };