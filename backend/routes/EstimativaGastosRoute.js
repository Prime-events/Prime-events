const express = require('express');
const estimativaGastos = require('../controllers/EstimativaGastosController');

const routes = express.Router();

routes.post('/CriarCategoria', estimativaGastos.createCategoria);

module.exports = routes;