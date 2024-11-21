const express = require('express');
const userRoutes = require('./userRoutes'); // Importa las rutas de usuarios

const router = express.Router();

router.use('/users', userRoutes); // Define la ruta base para usuarios

module.exports = router;
