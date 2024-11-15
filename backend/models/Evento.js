const { DataTypes } = require("sequelize");
const sequelize  = require ('../config/db');
const Usuario = require("./Usuario");

const Evento = sequelize.define(
    'eventos',
    {
        id_evento:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nomeEvento:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricaoEvento:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        dataHoraInicial:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        dataHoraFinal:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        nomeLocal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cep: {
            type: DataTypes.STRING(8),
            allowNull: true,
        },
        rua: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        complemento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numero: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagem: {
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
    }
  );

  Evento.belongsTo(Usuario, { foreignKey: 'id_usuario' });
  
Evento.associate = (models) => {
    Evento.hasMany(models.convidados, { foreignKey: 'id_evento' });
    Evento.hasMany(models.programacao_evento, { foreignKey: 'id_evento' });
    Evento.hasMany(models.estimativa_gastos, { foreignKey: 'id_evento' });
}  
module.exports = Evento;
    
    
    

