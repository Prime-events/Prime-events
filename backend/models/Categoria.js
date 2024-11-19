const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');
const Usuario = require("./Usuario") ;

const Categoria = sequelize.define('categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Categoria.belongsTo(Usuario, {foreignKey: 'id_usuario'})

module.exports = Categoria;
