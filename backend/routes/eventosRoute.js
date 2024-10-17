const express = require('express');
const EventoController = require('../controllers/eventos_controller');

const routes = express.Router();

routes.get('/eventos', EventoController.listarEventos);
routes.get('/eventos/:id', EventoController.listarEventoPorId);
routes.post('/eventos', EventoController.criarEvento);
routes.put('/eventos/:id', EventoController.atualizarEvento);
routes.delete('/eventos/:id', EventoController.deletarEvento);

module.exports = routes