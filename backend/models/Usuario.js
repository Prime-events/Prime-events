const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');

const Usuario = sequelize.define(
    'usuarios',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  );

  module.exports = Usuario;