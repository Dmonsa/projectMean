'use strict'

var express = require('express');
var app = express();
// Creo variable para crear las rutas...
var api = express.Router();
var userController = require('../Controller/Usuarios/user.controller');
var autenticate = require('../Middleware/validateToken');

api.post('/usuario', userController.saveUser);
api.post('/login', userController.loginUser);
api.put('/update/:id',[autenticate], userController.UpdateUser);
api.get('/usuarios/:id?', userController.listUsers);
api.delete('/eliminar-usuario/:id',[autenticate], userController.DeleteUser);


module.exports = api;