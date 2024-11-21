const Usuario = require('../models/user'); // Asegúrate de que la ruta sea correcta

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id); // Buscar por ID primario
        if (!usuario) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { nombre, email, rol, especializacion } = req.body;
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            rol,
            especializacion
        });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, rol, especializacion } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "User not found" });
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.email = email || usuario.email;
        usuario.rol = rol || usuario.rol;
        usuario.especializacion = especializacion || usuario.especializacion;

        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "User not found" });
        }

        await usuario.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
