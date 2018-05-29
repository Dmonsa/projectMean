'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Importo las rutas 
var userRoutes = require('./Rutas/user.route');
var projectRoutes = require('./Rutas/project.route');
var teamRoutes = require('./Rutas/team.route');
var meetingRoutes = require('./Rutas/meeting.route');


//Body parser, parseo todo lo que me llegue por http a formato JSON...
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//Configuro las rutas....
app.use(userRoutes);
app.use(projectRoutes);
app.use(teamRoutes);
app.use(meetingRoutes);

module.exports = app;
