const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "users", // Asegúrate de que coincida con el nombre de la tabla en tu base de datos.
});

module.exports = User;