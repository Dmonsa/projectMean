'use strict'

var moment = require('moment');
var jwt = require('jwt-simple');
var secret = 'desencriptar';

exports.createToken = function (user) {

    var payLoad = {
        nombre : user.nombre,
        apellidos : user.apellidos,
        email : user.email,
        role : user.rol,
        fInit : moment().unix(),
        expired : moment().add(4, "minutes").unix()
    }

    return jwt.encode(payLoad, secret);
}




