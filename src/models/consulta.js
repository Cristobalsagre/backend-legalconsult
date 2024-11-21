const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consulta = sequelize.define(
  'Consulta',
  {
    consulta_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_progreso', 'completada'),
      defaultValue: 'pendiente',
    },
    creada_en: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
    tableName: 'consultas',
  }
);

module.exports = Consulta;
