const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Consulta = db.define("Consulta", {
  consultaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "consulta_id", // Mapeo al nombre de la columna en la tabla
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "usuario_id", // Mapeo al nombre de la columna en la tabla
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "en_progreso", "completada"),
    defaultValue: "pendiente",
  },
  creadaEn: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "creada_en", // Mapeo al nombre de la columna en la tabla
  },
}, {
  tableName: "consultas", // Nombre exacto de la tabla en la base de datos
  timestamps: false, // Desactiva las columnas automáticas createdAt y updatedAt
});

module.exports = Consulta;