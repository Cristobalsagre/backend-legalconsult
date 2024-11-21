const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Consultation = require('./consultation');

const Evaluation = sequelize.define('Evaluation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    evaluationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Evaluation.belongsTo(Consultation, { foreignKey: 'consultationId', onDelete: 'CASCADE' });

module.exports = Evaluation;
