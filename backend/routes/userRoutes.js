const express = require('express');
const UserController = require('../controllers/userController');

const routes = express.Router();

routes.post('/Cadastrar', UserController.CreateUser);

module.exports = routes;
