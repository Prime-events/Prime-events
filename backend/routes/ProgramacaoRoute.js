const express = require('express');
const ProgramacaoController = require('../controllers/ProgramacaoController');

const routes = express.Router();

routes.get('/programacaoEvento/:id_evento', ProgramacaoController.listarTarefas);
routes.post('/programacaoEvento', ProgramacaoController.criarProgramacao);

module.exports = routes;