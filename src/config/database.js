const { Sequelize } = require('sequelize');

// Configuración de Sequelize con credenciales directas
const sequelize = new Sequelize('legalconsult', 'root', '1245', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

// Prueba de conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sincroniza los modelos
    await sequelize.sync({ force: false });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
