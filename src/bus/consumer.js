const { channel } = require('./rabbitMQ');
const controllers = require('../controllers'); // Importa todos los controladores

const consumidores = [
    { name: 'user-management', handler: controllers.handleUserManagement },
    { name: 'consulta-management', handler: controllers.handleConsultaManagement },
    { name: 'assign-lawyer', handler: controllers.handleAssignLawyer },
    { name: 'message-queue', handler: controllers.handleMessageQueue },
    { name: 'progress-reports', handler: controllers.handleProgressReports },
    { name: 'case-evaluations', handler: controllers.handleCaseEvaluations },
    { name: 'satisfaction-reports', handler: controllers.handleSatisfactionReports },
    { name: 'lawyer-agendas', handler: controllers.handleLawyerAgendas },
];

const consumirMensajes = async (cola, handler) => {
    try {
        console.log(`Intentando inicializar consumidor para la cola: ${cola}`);
        await channel.assertQueue(cola);
        channel.consume(cola, async (message) => {
            if (message !== null) {
                console.log(`Mensaje recibido en la cola ${cola}:, message.content.toString()`);
                try {
                    await handler(JSON.parse(message.content.toString())); // Procesa el mensaje
                    channel.ack(message); // Marca el mensaje como procesado
                } catch (error) {
                    console.error(`Error procesando el mensaje en la cola ${cola}:, error.message`);
                }
            }
        });
        console.log(`Consumidor inicializado correctamente para la cola: ${cola}`);
    } catch (error) {
        console.error(`Error al inicializar el consumidor para la cola ${cola}:, error.message`);
    }
};

const iniciarConsumidores = async () => {
    for (const consumidor of consumidores) {
        if (!consumidor.handler) {
            console.error(`Handler no definido para la cola ${consumidor.name}`);
            continue; // Evita fallos si no encuentra el handler
        }
        await consumirMensajes(consumidor.name, consumidor.handler);
    }
};

module.exports = { iniciarConsumidores };
