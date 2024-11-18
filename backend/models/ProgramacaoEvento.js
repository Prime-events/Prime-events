const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');
const Evento = require("./Evento");

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
},
);

ProgramacaoEvento.belongsTo(Evento, { foreignKey: 'id_evento' });


module.exports = ProgramacaoEvento;
