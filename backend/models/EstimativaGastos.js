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
        allowNull: false,
    },
    quantidade_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
});

EstimativaGastos.associate = (models) => {
    EstimativaGastos.belongsTo(models.eventos, { foreignKey: 'id_evento' });
};

module.exports = EstimativaGastos;
