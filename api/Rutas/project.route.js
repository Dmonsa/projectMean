'use strict'

var express = require('express');
var app = express();
// Creo variable para crear las rutas...
var api = express.Router();
var projectController = require('../Controller/Proyectos/proyecto.controller');

//var EmailCtrl = require('../Services/SendMail');

api.post('/project', projectController.saveProject);
api.get('/projects/:id?', projectController.listProject);
api.put('/updateproject/:id', projectController.UpdateProject);
api.delete('/deleteproject/:id', projectController.DeleteProject);



//email route
//api.post('/email', EmailCtrl.sendEmail);

module.exports = api;