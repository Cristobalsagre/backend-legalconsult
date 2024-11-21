const Consulta = require('../models/consulta');

exports.createConsulta = async (req, res) => {
    try {
        const { usuario_id, descripcion } = req.body;

        if (!usuario_id || !descripcion) {
            return res.status(400).json({ message: 'Usuario y descripción son obligatorios.' });
        }

        const consulta = await Consulta.create({ usuario_id, descripcion });
        return res.status(201).json({ message: 'Consulta creada exitosamente', consulta });
    } catch (error) {
        console.error('Error creando consulta:', error);
        return res.status(500).json({ message: 'Error creando consulta', error: error.message });
    }
};

exports.getAllConsultas = async (req, res) => {
    try {
        const consultas = await Consulta.findAll();
        return res.status(200).json(consultas);
    } catch (error) {
        console.error('Error obteniendo consultas:', error);
        return res.status(500).json({ message: 'Error obteniendo consultas', error: error.message });
    }
};

exports.getConsultaById = async (req, res) => {
    try {
        const consulta = await Consulta.findByPk(req.params.id);

        if (!consulta) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        return res.status(200).json(consulta);
    } catch (error) {
        console.error('Error obteniendo consulta por ID:', error);
        return res.status(500).json({ message: 'Error obteniendo consulta por ID', error: error.message });
    }
};

exports.updateConsultaById = async (req, res) => {
    try {
        const consulta = await Consulta.findByPk(req.params.id);

        if (!consulta) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        const { descripcion, estado } = req.body;

        consulta.descripcion = descripcion || consulta.descripcion;
        consulta.estado = estado || consulta.estado;

        await consulta.save();

        return res.status(200).json({ message: 'Consulta actualizada exitosamente', consulta });
    } catch (error) {
        console.error('Error actualizando consulta:', error);
        return res.status(500).json({ message: 'Error actualizando consulta', error: error.message });
    }
};

exports.deleteConsultaById = async (req, res) => {
    try {
        const consulta = await Consulta.findByPk(req.params.id);

        if (!consulta) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        await consulta.destroy();
        return res.status(200).json({ message: 'Consulta eliminada exitosamente' });
    } catch (error) {
        console.error('Error eliminando consulta:', error);
        return res.status(500).json({ message: 'Error eliminando consulta', error: error.message });
    }
};
