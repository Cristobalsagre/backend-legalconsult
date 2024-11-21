const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 2000;

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
