

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
    perfil: String,
    rol: String
});

module.exports = mongoose.model('User',userSchema);