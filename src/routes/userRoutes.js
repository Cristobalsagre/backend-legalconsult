const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Asegúrate de que la ruta es correcta

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Actualizar un usuario por ID
router.put('/:id', userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
