'use strict'

var mongoose = require('mongoose');


module.exports.conexionMongo = function () {
    mongoose.connect('mongodb://127.0.0.1:27017/myproject1',function(){
        console.log("Servidor de base de datos levantada");
    });
}




