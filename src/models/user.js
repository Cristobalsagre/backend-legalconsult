const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    rol: {
        type: DataTypes.ENUM('cliente', 'abogado'),
        allowNull: false,
    },
    especializacion: {
        type: DataTypes.STRING(255),
        allowNull: true, // Puede ser NULL para clientes.
    },
    creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'usuarios', // Nombre exacto de la tabla en la base de datos.
    timestamps: false, // No queremos createdAt/updatedAt automáticos.
});

module.exports = Usuario;
