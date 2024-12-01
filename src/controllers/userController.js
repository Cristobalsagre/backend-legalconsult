const User = require('../models/user'); // Modelo Sequelize para usuarios

const handleUserManagement = async (message) => {
    try {
        console.log('Procesando mensaje en user-management:', message.content.toString());
        const { nombre, correo, rol, contrasena } = JSON.parse(message.content.toString());

        if (!nombre || !correo || !rol || !contrasena) {
            throw new Error('Datos incompletos para crear usuario.');
        }

        // Lógica real: Crear usuario en la base de datos
        const nuevoUsuario = await User.create({
            nombre,
            correo,
            rol,
            contrasena
        });

        console.log('Usuario creado con éxito:', nuevoUsuario);
    } catch (error) {
        console.error('Error en handleUserManagement:', error.message);
    }
};

module.exports = { handleUserManagement };