const express = require('express');
const estimativaGastos = require('../controllers/EstimativaGastosController');

const routes = express.Router();

routes.post('/CriarCategoria', estimativaGastos.createCategoria);
routes.post('/CriarGasto', estimativaGastos.createEstimativaGastos);
routes.get('/getAllCategorias', estimativaGastos.getAllCategorias);
routes.get('/getEstimativaGastos/:id_evento', estimativaGastos.getEstimativaByEvento)


module.exports = routes;