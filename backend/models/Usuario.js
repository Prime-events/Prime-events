const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');

const Usuario = sequelize.define(
    'usuarios',
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sobrenome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        corPerfil: { // Campo para armazenar a cor
            type: DataTypes.STRING,
            allowNull: true,
        },
    }
);

Usuario.associate = (models) => {
    Usuario.hasMany(models.eventos, { foreignKey: 'id_usuario' });
}  



module.exports = Usuario;