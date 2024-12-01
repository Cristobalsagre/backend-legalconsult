const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Agenda = db.define("Agenda", {
  abogadoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horaFin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

module.exports = Agenda;