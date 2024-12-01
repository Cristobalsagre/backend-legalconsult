const createConsulta = async (req, res) => {
    try {
        const { titulo, descripcion, area } = req.body;
        if (!titulo || !descripcion || !area) {
            return res.status(400).json({ success: false, message: "Faltan datos requeridos" });
        }

        // Simulación de lógica para registrar consulta
        const consulta = {
            id: Math.floor(Math.random() * 1000),
            titulo,
            descripcion,
            area,
        };
        console.log("Consulta creada:", consulta);
        res.status(201).json({ success: true, data: consulta });
    } catch (error) {
        console.error("Error creando consulta:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getConsultaById = async (req, res) => {
    try {
        const consultaId = req.params.consultaId;
        if (!consultaId) {
            return res.status(400).json({ success: false, message: "ID de consulta requerido" });
        }

        // Simulación de datos obtenidos
        const consulta = {
            id: consultaId,
            titulo: "Consulta Ejemplo",
            descripcion: "Detalles de la consulta",
            area: "Área Ejemplo",
        };
        console.log("Consulta obtenida:", consulta);
        res.status(200).json({ success: true, data: consulta });
    } catch (error) {
        console.error("Error obteniendo consulta:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createConsulta, getConsultaById };