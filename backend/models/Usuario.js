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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

Usuario.associate = (models) => {
    Usuario.hasMany(models.eventos, { foreignKey: 'id_usuario' });
}  
sequelize.sync({ force: true });


module.exports = Usuario;