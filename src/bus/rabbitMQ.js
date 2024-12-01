const express = require('express');
 // Ajusta la ruta según la estructura de tu proyecto

const app = express();

// Importar rutas
const consultaRoutes = require('./routes/consultaRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const satisfactionReportRoutes = require('./routes/satisfactionReportRoutes');
const consultaAssignRoutes = require('./routes/consultaAssignRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const userRoutes = require('./routes/userRoutes');
const agendaRoutes = require('./routes/agendaRoutes');

// Middleware
app.use(express.json());

// Registrar rutas
app.use('/api/consultas', consultaRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/satisfaction-reports', satisfactionReportRoutes);
app.use('/api/consultas/assign', consultaAssignRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/agendas', agendaRoutes);

// Ruta de prueba para enviar mensajes a RabbitMQ
app.post('/api/mensajes/enviar', async (req, res) => {
    const { queue, message } = req.body;
    try {
        const { enviarMensaje } = require('./bus/rabbitMQ');
        await enviarMensaje(queue, message);
        res.status(200).send({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar mensaje:', error.message);
        res.status(500).send({ success: false, error: error.message });
    }
});

// Función para iniciar el servidor y servicios
const startServer = async () => {
    try {
        console.log('Conectando a RabbitMQ...');
        await conectarRabbitMQ(); // Conexión a RabbitMQ
        console.log('Conexión a RabbitMQ exitosa.');

        console.log('Iniciando consumidores...');
        await iniciarConsumidores(); // Inicia los consumidores
        console.log('Todos los consumidores están inicializados y escuchando mensajes.');

        // Iniciar el servidor
        const server = app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });

    } catch (error) {
        console.error('Error inicializando el sistema:', error.message);
        process.exit(1); // Salir con error si algo falla
    }
};

// Iniciar el sistema
startServer();

module.exports = app;
const amqp = require('amqplib');

let connection;
let channel;

// Lista de colas necesarias para los RFs
const COLAS = [
    'user-management',        // RF-01: Gestión de Usuarios
    'consulta-management',    // RF-02: Registro de Consultas
    'assign-lawyer',          // RF-03: Asignación de Abogado
    'message-queue',          // RF-04: Mensajería
    'progress-reports',       // RF-05: Generación de Reportes
    'case-evaluations',       // RF-06: Evaluación de Casos
    'satisfaction-reports',   // RF-07: Reporte de Satisfacción
    'lawyer-agendas',         // RF-08: Gestión de Agendas
];

/**
 * Conecta a RabbitMQ y establece un canal.
 */
const conectarRabbitMQ = async () => {
    try {
        console.log('Intentando conectar a RabbitMQ...');
        connection = await amqp.connect('amqp://localhost'); // Cambia la URL si es necesario
        channel = await connection.createChannel();
        console.log('Conexión a RabbitMQ exitosa.');
    } catch (error) {
        console.error('Error al conectar a RabbitMQ:', error.message);
        throw error;
    }
};

/**
 * Crea las colas necesarias en RabbitMQ.
 */
const crearColas = async () => {
    try {
        if (!channel) {
            throw new Error('El canal de RabbitMQ no está disponible.');
        }
        for (const cola of COLAS) {
            await channel.assertQueue(cola, { durable: true });
            console.log(`Cola creada/verificada: ${cola}`);
        }
    } catch (error) {
        console.error('Error al crear las colas en RabbitMQ:', error.message);
        throw error;
    }
};

/**
 * Envía un mensaje a una cola específica en RabbitMQ.
 * @param {string} queue - Nombre de la cola.
 * @param {string} message - Mensaje a enviar.
 */
const enviarMensaje = async (queue, message) => {
    try {
        if (!channel) {
            throw new Error('El canal de RabbitMQ no está disponible.');
        }
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(`Mensaje enviado a la cola "${queue}":, message`);
    } catch (error) {
        console.error(`Error enviando mensaje a la cola ${queue}:, error.message`);
        throw error;
    }
};

/**
 * Consume mensajes de una cola específica en RabbitMQ.
 * @param {string} queue - Nombre de la cola.
 * @param {function} handler - Función para manejar los mensajes consumidos.
 */
const consumirMensajes = async (queue, handler) => {
    try {
        if (!channel) {
            throw new Error('El canal de RabbitMQ no está disponible.');
        }
        await channel.assertQueue(queue, { durable: true });
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                console.log(`Mensaje recibido de la cola "${queue}": ${msg.content.toString()}`);
                try {
                    await handler(JSON.parse(msg.content.toString())); // Asume que el mensaje es JSON
                    channel.ack(msg);
                } catch (error) {
                    console.error(`Error manejando mensaje de la cola ${queue}:, error.message`);
                    channel.nack(msg, false, false); // Rechaza el mensaje sin reintentarlo
                }
            }
        });
        console.log(`Esperando mensajes en la cola "${queue}"...`);
    } catch (error) {
        console.error(`Error al consumir mensajes de la cola ${queue}:, error.message`);
        throw error;
    }
};

/**
 * Inicia los consumidores para todas las colas definidas.
 * @param {Object} handlers - Objeto con las funciones manejadoras para cada cola.
 */
const iniciarConsumidores = async (handlers) => {
    try {
        for (const cola of COLAS) {
            const handler = handlers[cola];
            if (handler) {
                console.log(`Iniciando consumidor para la cola "${cola}"...`);
                await consumirMensajes(cola, handler);
            } else {
                console.warn(`Handler no definido para la cola "${cola}"`);
            }
        }
        console.log('Todos los consumidores están inicializados y escuchando mensajes.');
    } catch (error) {
        console.error('Error al iniciar los consumidores:', error.message);
        throw error;
    }
};

module.exports = {
    conectarRabbitMQ,
    crearColas,
    enviarMensaje,
    consumirMensajes,
    iniciarConsumidores,
};