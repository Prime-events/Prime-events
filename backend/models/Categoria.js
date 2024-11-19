const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');
import EstimativaGastos from "./EstimativaGastos";
import Usuario from "./Usuario";

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

Categoria.hasOne(EstimativaGastos, { foreignKey: 'id_categoria' });
Categoria.belongsTo(Usuario, {foreignKey: 'id_usuario'})

module.exports = Categoria;
