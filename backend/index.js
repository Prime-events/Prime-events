const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
pool = require('./config/db');



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

const allowedOrigins = ['http://localhost:5173',
    'http://localhost:3001',
    'http://127.0.0.1:5500'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routesPublicacoes);