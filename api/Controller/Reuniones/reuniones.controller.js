'use strict'

var Meeting = require('../../Modelo/Reuniones/meeting');
var Mail = require('../../Services/SendMail');




function saveMeeting(req,res) {

    var meeting = new Meeting();

    //console.log(req.body);
    var params = req.body;
    //console.log("hola",params);
    meeting.id_project = params.id_project;
    meeting.in_meet = params.in_meet;
    meeting.date = params.date;
    meeting.hour = params.hour;
    meeting.description = params.description;
    meeting.link = params.link;
    
    
    meeting.save((err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error on the server' });
        }

        else {
            if (!result) {
                res.status(404).send({ message: 'The meeting could not be registered' });
            }
            else {
                Mail.sendMail();
                res.status(200).send({ message: result });
            }
        }
    });
}


function listTeam(req,res) {

    var teamId = req.params.id;

    if(!teamId) {

        Team.find({},(err,teams)=>{

            if (err) {
                res.status(500).send({ message: 'Error on the server' });
            }
    
            else {
    
                if (!teams) {
                    res.status(404).send({ message: 'There are no meetings'});
                }
    
                else {
                    res.status(200).send({ message: teams });
                }
            }
        });
    }

    else {
        Team.find({_id:teamId},(err,team)=>{

            if (err) {
                res.status(500).send({ message: 'Error on the server' });
            }
    
            else {
    
                if (team) {
                    res.status(404).send({ message: 'No se encontro equipo'});
                }
            }
        });
    }  
}

function updateTeam(req, res) {

    var teamId = req.params.id;
    var params = req.body;
  
    Team.findByIdAndUpdate({_id: teamId}, params, (err, teamUpdate) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }

        else {

            if (!teamUpdate) {
                res.status(404).send({ message: 'El equipo no existe' });
            }

            else {

                res.status(200).send({ message: teamUpdate });

            }
        }
    });
}

function deleteTeam(req, res) {

    var teamId = req.params.id;
    var params = req.body;
    var email = params.email;

    Team.findByIdAndRemove({_id:teamId}, (err, teamRemove) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }

        else {

            if (!teamRemove) {
                res.status(404).send({ message: 'El equipo no existe' });
            }

            else {

                res.status(200).send({ message: teamRemove });
            }
        }
    });
}


module.exports = {
    
  saveMeeting
}