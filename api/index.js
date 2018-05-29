'use strict'

var app = require('./app');
//Import la clase de la conexión...
var conexionDB = require('./DB/connection');

var port = process.argv.PORT || 5890;

conexionDB.conexionMongo();

app.listen(port,function(){
    console.log("servidor levantado",port);

});