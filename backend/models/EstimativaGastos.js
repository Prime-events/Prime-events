const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');
const Evento = require("./Evento");

const EstimativaGastos = sequelize.define('estimativa_gastos', {
    id_estimativa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_item: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

EstimativaGastos.belongsTo(Evento, { foreignKey: 'id_evento' });

module.exports = EstimativaGastos;
