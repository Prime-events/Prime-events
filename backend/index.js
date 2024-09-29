const express = require('express');
const app = express();
const port = 3001;
pool = require('./config/db');

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});