'use strict'

var express = require('express');
var app = express();
// Creo variable para crear las rutas...
var api = express.Router();
var teamController = require('../Controller/Teams/team.controller');

api.post('/team', teamController.saveTeam);
api.put('/updateteam/:id', teamController.updateTeam);
api.get('/teams/:id?', teamController.listTeam);
api.delete('/eliminarteam/:id', teamController.deleteTeam);


module.exports = api;