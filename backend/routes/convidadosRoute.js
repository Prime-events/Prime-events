const express = require('express');
const ConvidadoController = require('../controllers/ConvidadoController');

const routes = express.Router();

routes.get('/convidados', ConvidadoController.listarConvidados);
routes.get('/convidados/:id_evento', ConvidadoController.listarConvidadoPorId);
routes.post('/convidados', ConvidadoController.cadastrarConvidado);
routes.put('/convidados/:id', ConvidadoController.atualizarConvidado);
routes.delete('/convidados/:id', ConvidadoController.deletarConvidado);

module.exports = routes