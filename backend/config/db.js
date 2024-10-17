const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Credenciais
const dbHost = process.env.DB_HOST
const dbUser   = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbDatabase = process.env.DB_DATABASE

// Conexão
const pool = mysql.createPool({
    host: dbHost,
    user: dbUser  ,
    password: dbPassword,
    database: dbDatabase
}).promise();

const sequelize = new Sequelize(dbDatabase, dbUser  , dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados!');
  } catch (error) {
    console.error('Erro em conectar ao banco de dados', error.message);
  }
}

connectToDatabase();

module.exports = sequelize;