const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');

const lista_convidados = sequelize.define(
    'lista_convidados',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_convidado:{
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        nome_convidado:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_evento:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'eventos',
            referencesKey: 'id',
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

  export default lista_convidados;
    
    
    