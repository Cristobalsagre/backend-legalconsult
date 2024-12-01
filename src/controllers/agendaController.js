const Agenda = require('../models/agenda'); // Modelo Sequelize para agendas

const handleLawyerAgendas = async (message) => {
    try {
        console.log('Procesando mensaje en lawyer-agendas:', message.content.toString());
        const { abogadoId, horariosDisponibles } = JSON.parse(message.content.toString());

        if (!abogadoId || !horariosDisponibles) {
            throw new Error('Datos incompletos para gestionar la agenda.');
        }

        // Lógica real: Crear o actualizar la agenda en la base de datos
        const nuevaAgenda = await Agenda.create({
            abogadoId,
            horariosDisponibles
        });

        console.log('Agenda creada/actualizada con éxito:', nuevaAgenda);
    } catch (error) {
        console.error('Error en handleLawyerAgendas:', error.message);
    }
};

module.exports = { handleLawyerAgendas };