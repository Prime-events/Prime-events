const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');

const ProgramacaoEvento = sequelize.define('programacao_evento', {
    id_programacao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    horario_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    horario_fim: {
        type: DataTypes.DATE,
        allowNull: false, 
    },
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'eventos', 
            key: 'id_evento',
        },
    },
}, {
    timestamps: false,
});

ProgramacaoEvento.associate = (models) => {
    ProgramacaoEvento.belongsTo(models.eventos, { foreignKey: 'id_evento' });
};

module.exports = ProgramacaoEvento;