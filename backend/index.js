const express = require('express');
const app = express();
const port = 3001;
pool = require('./config/db');
const cors = require('cors');
const eventosRouter = require('./routes/eventosRoute'); 
const usersRouter = require('./routes/userRoutes');
const convidadosRouter = require('./routes/convidadosRoute');
const estimativaRouter = require('./routes/EstimativaGastosRoute');
const ProgramacaoRouter = require('./routes/ProgramacaoRoute');



app.use(express.json());
pool.sync(); //Com o force:true as tabelas sempre irão ser recriadas


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});



const allowedOrigins = ['http://localhost:5173',
    'http://localhost:3001',
    'http://127.0.0.1:5500',
    'http://192.168.11.27:5173',
    'http://192.168.0.105:5173',
    'http://192.168.100.4:5173'];

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
app.use('/api', usersRouter);
app.use(eventosRouter);
app.use(usersRouter);
app.use(convidadosRouter);
app.use(estimativaRouter);
app.use(ProgramacaoRouter);
