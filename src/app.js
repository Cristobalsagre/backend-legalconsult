const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api', routes);
// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Welcome to the LegalConsult API!');
  });

const mensajeRoutes = require('./routes/mensajeRoutes');
const reporteRoutes = require('./routes/reporteRoutes');


app.use('/api/mensajes', mensajeRoutes);
app.use('/api/reportes', reporteRoutes);
const consultaRoutes = require('./routes/consultaRoutes');
app.use('/api/consultas', consultaRoutes);

module.exports = app;
