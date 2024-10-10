const express = require('express');
const app = express();
const port = 3001;
pool = require('./config/db');
const eventosRouter = require('./routes/eventosRoute'); 

app.use(express.json());

app.use(eventosRouter);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});