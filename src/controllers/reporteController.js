const Reporte = require('../models/reporte'); // Modelo Sequelize para reportes

const handleProgressReports = async (message) => {
    try {
        console.log('Procesando mensaje en progress-reports:', message.content.toString());
        const { consultaId, descripcion, progreso } = JSON.parse(message.content.toString());

        if (!consultaId || !descripcion || !progreso) {
            throw new Error('Datos incompletos para generar reporte.');
        }

        // Lógica real: Crear reporte en la base de datos
        const nuevoReporte = await Reporte.create({
            consultaId,
            descripcion,
            progreso
        });

        console.log('Reporte generado con éxito:', nuevoReporte);
    } catch (error) {
        console.error('Error en handleProgressReports:', error.message);
    }
};

module.exports = { handleProgressReports };