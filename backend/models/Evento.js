const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');

const Evento = sequelize.define(
    'eventos',
    {
        id_evento:{
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

Evento.associate = (models) => {
  Evento.belongsTo(models.usuarios, { foreignKey: 'id_usuario' });
  Evento.hasMany(models.convidados, { foreignKey: 'id_evento' });
  sequelize.sync({ force: true });
}  
module.exports = Evento;
    
    
    

