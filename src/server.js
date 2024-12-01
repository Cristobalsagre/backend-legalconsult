const express = require('express');
const { conectarRabbitMQ } = require('./bus/rabbitMQ'); // Ajusta la ruta según la estructura de tu proyecto
const { iniciarConsumidores } = require('./bus/consumer');
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