const express = require('express');
const estimativaGastos = require('../controllers/EstimativaGastosController');

const routes = express.Router();

routes.post('/CriarCategoria', estimativaGastos.createCategoria);
routes.get('/getAllCategorias', estimativaGastos.getAllCategorias);

module.exports = routes;