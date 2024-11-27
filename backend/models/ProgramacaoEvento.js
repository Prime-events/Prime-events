    const { DataTypes } = require("sequelize");
    const sequelize = require('../config/db');
    const Evento = require("./Evento");

    const ProgramacaoEvento = sequelize.define('programacao_evento', {
        id_programacao: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        horario: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    );

    ProgramacaoEvento.belongsTo(Evento, { foreignKey: 'id_evento' });


    module.exports = ProgramacaoEvento;
