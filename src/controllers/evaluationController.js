const Evaluacion = require('../models/evaluacion'); // Modelo Sequelize para evaluaciones

const handleCaseEvaluations = async (message) => {
    try {
        console.log('Procesando mensaje en case-evaluations:', message.content.toString());
        const { consultaId, calificacion, comentarios } = JSON.parse(message.content.toString());

        if (!consultaId || !calificacion) {
            throw new Error('Datos incompletos para evaluar caso.');
        }

        // Lógica real: Registrar la evaluación en la base de datos
        const nuevaEvaluacion = await Evaluacion.create({
            consultaId,
            calificacion,
            comentarios
        });

        console.log('Evaluación registrada con éxito:', nuevaEvaluacion);
    } catch (error) {
        console.error('Error en handleCaseEvaluations:', error.message);
    }
};

module.exports = { handleCaseEvaluations };