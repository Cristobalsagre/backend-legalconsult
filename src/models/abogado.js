const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Abogado = db.define("Abogado", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especializacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: "abogados",
  timestamps: false, // Desactiva las columnas createdAt y updatedAt si no las usas
});

module.exports = Abogado;