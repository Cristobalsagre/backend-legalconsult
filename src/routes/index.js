const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const consultaRoutes = require('./consultaRoutes');

// Rutas para usuarios
router.use('/users', userRoutes);

// Rutas para consultas
router.use('/consultas', consultaRoutes);


const Consulta = require("./consulta");
const Abogado = require("./abogado");
const Usuario = require("./usuario");
module.exports = router;
module.exports = { Consulta, Abogado, Usuario };