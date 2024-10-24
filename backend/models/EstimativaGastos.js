const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');

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
    valor_item: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    quantidade_item: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

EstimativaGastos.associate = (models) => {
    EstimativaGastos.belongsTo(models.eventos, { foreignKey: 'id_evento' });
};

module.exports = EstimativaGastos;