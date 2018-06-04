'use strict'

var Team = require('../../Modelo/Teams/team.model');


var team = new Team();

function saveTeam(req,res) {

    console.log(req.body);
    var params = req.body;
    
    team.nombre = params.nombre;
    team.location = params.location;
    
    
    team.save((err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error el el servidor' });
        }

        else {
            if (!result) {
                res.status(404).send({ message: 'Could not register the team' });
            }
            else {
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
                    res.status(404).send({ message: 'There are no teams'});
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
                    res.status(404).send({ message: 'No equipment found'});
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
            res.status(500).send({ message: 'Error on the server' });
        }

        else {

            if (!teamUpdate) {
                res.status(404).send({ message: 'The equipment does not exist' });
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
            res.status(500).send({ message: 'Error on the server' });
        }

        else {

            if (!teamRemove) {
                res.status(404).send({ message: 'The equipment does not exist' });
            }

            else {

                res.status(200).send({ message: teamRemove });
            }
        }
    });
}


module.exports = {
    
    saveTeam,
    listTeam,
    updateTeam,
    deleteTeam
}