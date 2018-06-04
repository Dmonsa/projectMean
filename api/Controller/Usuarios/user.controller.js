'use strict'

var User = require('../../Modelo/Usuarios/users.model');
var jwt = require('../../Services/CreateToken');
var bcrypt = require('bcrypt-nodejs');


var user = new User();
var rol = 'user';

// Función para crear nuevos usuarios con req.body capturo todas lo que me llegue por post..
function saveUser(req, res) {

	var params = req.body;	
	var password;
    user.nombre = params.nombre;
    user.apellidos = params.apellidos;
	user.email = params.email;
	user.perfil = params.perfil;
    user.rol = rol;

	if (params.password) {
		// Encriptar contraseña y guardo los datos...
		bcrypt.hash(params.password, null, null, function (err, hash) {

			user.password = hash;
            console.log(hash);
			if (user.nombre != null  && user.email != null) {
				// Guardo el usuario en la base de datos....
				user.save((err, userStored) => {

					if (err) {
						res.status(500).send({ message: 'Error when saving the user' });
					}

					else {

						if (!userStored) {
							res.status(500).send({ message: 'The user has not registered' });
						}

						else {
							res.status(200).send({ user: userStored });
						}
					}
				});
			}

			else {
				res.status(200).send({ message: 'Fill in all the fields' });
			}
		});
	}
	else {
		res.status(200).send({ message: 'Enter the password' });
	}
}

function loginUser(req, res) {

	let params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({ email: email.toLowerCase() }, (err, user) => {
		if (err) {
			res.status(500).send({ message: 'Error in the request' });
		}

		else {

			if (!user) {
				res.status(404).send({ message: 'User does not exist' });
			}
			else {
				// Comprobar el password...
				bcrypt.compare(password, user.password, (err, check) => {
					if (check) {
						// Devuelvo los datos del usuario logeado...
						if (params.gethash) {
							// Devolver un token de jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}

						else {
							res.status(200).send({ user });
						}
					}

					else {
						res.status(404).send({ message: 'The user could not log in' });
					}
				});
			}
		}
	});
}

function listUsers(req, res) {

    var userId = req.params.id;

    if (!userId) {

        User.find({}, (err, users) => {

            if (err) {
                res.status(500).send({ message: 'Error on the server' });
            }

            else {

                if (!users) {
                    res.status(404).send({ message: 'No users' });
                }

                else {
                    res.status(200).send({ message: users });
                }
            }
        });
    }

    else {
        User.findById({ _id: userId }, (err, user) => {

            if (err) {
                res.status(500).send({ message: 'Error on the server' });
            }

            else {

                if (user) {
                    res.status(404).send({ message: 'No user found' });
                }
            }
        });
    }
}

function UpdateUser(req, res) {
	
	var userId = req.params.id;
	var update = req.body;

	if (userId != req.user.sub) {
	 return	res.status(500).send({ message: 'You do not have permission to execute this action' });
	}

	else {
		
		User.findByIdAndUpdate(userId, update, (err, userUpdate) => {

			if (err) {
				res.status(500).send({ message: 'Error updating the user' });
			}

			else {
				if (!userUpdate) {
					res.status(404).send({ message: 'The user could not be updated' });
				}

				else {
					res.status(200).send({ user: userUpdate });
				}
			}
		});
	}
}

function DeleteUser(req, res) {

    var userId = req.params.id;
    var params = req.body;
    var email = params.email;

    User.findByIdAndRemove({ _id: userId }, (err, userRemove) => {

        if (err) {
            res.status(500).send({ message: 'Error on the server' });
        }

        else {

            if (!userRemove) {
                res.status(404).send({ message: 'User does not exist' });
            }

            else {

                res.status(200).send({ message: userRemove });
            }
        }
    });
}

module.exports = {
    saveUser,
    loginUser,
    UpdateUser,
    DeleteUser,
    listUsers
}