const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');
const Evento = require("./Evento");

const Convidado = sequelize.define(
    'convidados',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        presenca:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }
);
    
Convidado.belongsTo(Evento, { foreignKey: 'id_evento' });

module.exports = Convidado;
    
    
    