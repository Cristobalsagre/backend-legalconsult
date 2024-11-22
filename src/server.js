const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 1234;
const { connectToBus } = require('./bus/bus');

// Conectar al bus
connectToBus();
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();
const { consumeMessage } = require('./bus/bus');

consumeMessage('consultas', (message) => {
  console.log('Consulta recibida:', message);
  // Procesa el mensaje como sea necesario
});


// Configuración del puerto


// Iniciar el servidor
const server = app.listen(0, () => {
  console.log('Server running on http://localhost:${server.address().port}');
});

const { conectarRabbitMQ } = require('./bus/bus');

