const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const consultaRoutes = require('./consultaRoutes');

// Rutas para usuarios
router.use('/users', userRoutes);

// Rutas para consultas
router.use('/consultas', consultaRoutes);

module.exports = router;
