const handleLawyerAssignment = async (message) => {
    try {
        console.log('Mensaje recibido en la cola assign-lawyer:', message.content.toString());
        // Lógica para asignar abogado
        console.log('Abogado asignado correctamente.');
    } catch (error) {
        console.error('Error procesando la asignación de abogado:', error.message);
    }
};

module.exports = { handleLawyerAssignment };