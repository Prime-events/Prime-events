const mysql = require('mysql2');
require('dotenv').config();

//Credenciais
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbDatabase = process.env.DB_DATABASE

//conexão
const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase
}).promise();

// Logs para depuração
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

async function connectToDatabase() {
    try {
        await pool.getConnection();
        console.log('Conectado ao banco de dados!');
    } catch (error) {
        if (error.name === 'SequelizeConnectionError') {
            console.error('Unable to connect to the database:', error.message);
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error executing database query:', error.message);
        } else {
            console.error('Erro em conectar ao banco de dados', error.message);
        }
        }
    }
    connectToDatabase();

module.exports  = pool;