const express = require('express');
const app = express();
const mensajeRoutes = require('./routes/mensajeRoutes'); // Ajusta según tu ruta

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

// Rutas
app.use('/api/mensajes', mensajeRoutes);

module.exports = app;