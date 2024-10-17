const express = require('express');
const { default: userController } = require('../controller/userController');

const routes = express.Router();

routes.post('/Cadastrar', userController.CreateUser);

module.exports = routes;
