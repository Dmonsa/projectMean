 ///*
 'use strict'
var Project = require('../../Modelo/Proyectos/proyecto.model');
var Mail = require('../../Services/SendMail');
var moment = require('moment');




function saveProject(req,res) {
    var project = new Project();
    
    var params = req.body;

   
    project.nombre = params.nombre;
    project.dateFn = params.dateFn;
    project.tool1 = params.tool1;
    project.tool2 = params.tool2;
    project.tool3 = params.tool3;
    project.tool4 = params.tool4;


    var d = moment(params.dateIn).format('YYYY-MM-DD');
    console.log(d);
    
    project.save((err, result) => {

        if (err) {
            res.status(500).send({ message: 'Error on the server' });
        }

        else {
            if (!result) {
                res.status(404).send({ message: 'The project could not be registered' });
            }
            else {
                
                res.status(200).send({ message: result });
            }
        }
    });
}


function listProject(req,res) {

    var projectId = req.params.id;

    if(!projectId) {

        Project.find({},(err,projects)=>{

            if (err) {
                res.status(500).send({ message: 'Error on the server' });
            }
    
            else {
    
                if (!projects) {
                    res.status(404).send({ message: 'There are no projects'});
                }
    
                else {
                    res.status(200).send({ projects });
                }
            }
        });
    }

    else {
        Project.findById({_id : projectId},(err,project)=>{

            if (err) {
                res.status(500).send({ message: 'Error on the server' });
            }
    
            else {
    
                if (!project) {
                    res.status(404).send({ message: 'No project found'});
                }
                else {
                    res.status(200).send({ project });
                }
            }
        });
    }  
}

function UpdateProject(req, res) {

    var projectId = req.params.id;
    var params = req.body;
  
    Project.findByIdAndUpdate({_id: projectId}, params, (err, projectUpdate) => {

        if (err) {
            res.status(500).send({ message: 'Error on the server' });
        }

        else {

            if (!projectUpdate) {
                res.status(404).send({ message: 'The project does not exist' });
            }

            else {

                res.status(200).send({ message: projectUpdate });

            }
        }
    });
}

function DeleteProject(req, res) {

    var projectId = req.params.id;
    var params = req.body;
    var email = params.email;

    Project.findByIdAndRemove({_id:projectId}, (err, projectRemove) => {

        if (err) {
            res.status(500).send({ message: 'Error on the server' });
        }

        else {

            if (!projectRemove) {
                res.status(404).send({ message: 'The project does not exist' });
            }

            else {

                res.status(200).send({ message: projectRemove });
            }
        }
    });
}


module.exports = {
    saveProject,
    listProject,
    UpdateProject,
    DeleteProject    
}


//*/