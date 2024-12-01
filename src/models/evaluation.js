const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Evaluation = db.define("Evaluation", {
  consultaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Evaluation;
