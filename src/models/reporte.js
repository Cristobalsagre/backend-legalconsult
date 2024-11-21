const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reporte = sequelize.define('Reporte', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    consultaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    creadoEn: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'reportes', // Nombre de la tabla en la base de datos.
    timestamps: false,
});

module.exports = Reporte;
