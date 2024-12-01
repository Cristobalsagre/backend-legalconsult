const amqp = require('amqplib');

let channel;

const conectarRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('Conexión a RabbitMQ exitosa.');
    } catch (error) {
        console.error('Error conectando a RabbitMQ:', error.message);
        throw error;
    }
};

const enviarMensaje = async (queue, message) => {
    try {
        if (!channel) {
            throw new Error('El canal de RabbitMQ no está disponible.');
        }
        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Mensaje enviado a la cola "${queue}":, message`);
    } catch (error) {
        console.error('Error enviando mensaje a RabbitMQ:', error.message);
    }
};

module.exports = { conectarRabbitMQ, enviarMensaje };