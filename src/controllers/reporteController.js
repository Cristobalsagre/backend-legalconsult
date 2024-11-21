const Reporte = require('../models/reporte');
const Usuario = require('../models/user');
const Consulta = require('../models/consulta');

const generarReporte = async (req, res) => {
    try {
        const { abogadoId } = req.params;

        // Obtener consultas asignadas al abogado
        const consultas = await Consulta.findAll({ where: { abogadoId } });

        // Generar estadísticas
        const totalConsultas = consultas.length;
        const consultasResueltas = consultas.filter(c => c.estado === 'resuelta').length;

        const reporte = {
            abogadoId,
            totalConsultas,
            consultasResueltas
        };

        res.json({ message: "Reporte generado correctamente", reporte });
    } catch (error) {
        res.status(500).json({ message: "Error al generar reporte", error: error.message });
    }
};

module.exports = { generarReporte };
