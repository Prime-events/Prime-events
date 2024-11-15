const express = require('express');
const UserController = require('../controllers/userController');

const routes = express.Router();

routes.post('/Cadastrar', UserController.CreateUser);
routes.post('/Login', UserController.LoginUser);
routes.get('/getUser/:email', UserController.getUser);
routes.put('/updateUser/:email', UserController.updateUser);

module.exports = routes;
