const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Reporte = db.define("Reporte", {
  consultaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  progreso: {
    type: DataTypes.STRING, // Ejemplo: "En Progreso", "Completado"
    allowNull: false,
  },
});

module.exports = Reporte;