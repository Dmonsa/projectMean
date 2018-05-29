'use strict'

var moment = require('moment');
var jwt = require('jwt-simple');
var secret = 'desencriptar';

module.exports = function validateToken(req, res, next) {

    if( req.headers.authorization) {

        var payLoad = req.headers.authorization.replace(/['"]+/g, '');

        try {
            var data = jwt.decode(payLoad, secret);
                
            if (data.expired <= moment().unix()) {
    
                res.status(500).send({ message: 'El token expiró' });
            }
        } catch (error) {
            return res.status(404).send({ message: 'Token no valido' });
        }
    
        req.user = data;
    
        next();
    }

    else {
        res.status(500).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }   
}