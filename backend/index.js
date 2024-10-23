const express = require('express');
const app = express();
const port = 3001;
pool = require('./config/db');
const cors = require('cors');
const eventosRouter = require('./routes/eventosRoute'); 

app.use(express.json());
pool.sync({force: true}); //Com o force:true as tabelas sempre irão ser recriadas


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});