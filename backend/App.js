const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.listen(port, ()=> console.log(`rodando na porta ${port}`));