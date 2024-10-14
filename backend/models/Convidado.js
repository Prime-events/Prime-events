const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');

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
        }
    }
  );
    
    Convidado.belongsTo(Evento, { foreignKey: 'id_evento' });
    module.exports = Convidado;
    
    
    