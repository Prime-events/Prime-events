const express = require('express');
const EventoController = require('../controllers/EventoController');

const routes = express.Router();

routes.get('/eventos', EventoController.listarEventos);
routes.get('/eventos/:id_evento', EventoController.listarEventoPorId);
routes.get('/eventos/usuario/:id_usuario', EventoController.listarEventosUsuario);
routes.get('/eventos/pendentes/:id_usuario', EventoController.listarEventosPendentes);
routes.get('/eventos/nome/:nomeEvento', EventoController.listarEventoPorNome);
routes.get('/buscar-evento', EventoController.buscarEventoPorDataHora);
routes.post('/eventos', EventoController.criarEvento);
routes.put('/eventos/:id', EventoController.atualizarEvento);
routes.delete('/eventos/:id', EventoController.deletarEvento);

module.exports = routes;