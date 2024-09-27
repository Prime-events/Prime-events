const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');

const eventos = sequelize.define(
    'eventos',
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
      descricao:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      data_hora_inicial:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      data_hora_final:{
        type: DataTypes.DATE,
        allowNull:false
      },
      local:{
        type: DataTypes.STRING,
        allowNull: false
      },
    },

  );

  export default eventos;
    
    
    

