'use strict'

var express = require('express');
var app = express();
// Creo variable para crear las rutas...
var api = express.Router();
var meetingController = require('../Controller/Reuniones/reuniones.controller');

//var EmailCtrl = require('../Services/SendMail');

api.post('/reuniones', meetingController.saveMeeting);


//email route
//api.post('/email', EmailCtrl.sendEmail);

module.exports = api