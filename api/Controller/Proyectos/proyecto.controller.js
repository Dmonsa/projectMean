 ///*
 'use strict'
var Project = require('../../Modelo/Proyectos/proyecto.model');
var Mail = require('../../Services/SendMail');




function saveProject(req,res) {
    var project = new Project();
    
    var params = req.body;

   //New Commit
    project.nombre = params.nombre;
    project.dateIn = params.dateIn;
    project.dateFn = params.dateFn;
    project.tool1 = params.tool1;
    project.tool2 = params.tool2;
    project.tool3 = params.tool3;
    project.tool4 = params.tool4;
    
    console.log(params);
    
    project.save((err, result) => {

        if (err) {
            res.status(500).send({ message: 'Error el el servidor' });
        }

        else {
            if (!result) {
                res.status(404).send({ message: 'No se pudo registrar el proyecto' });
            }
            else {
                Mail.sendEmail();
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
                res.status(500).send({ message: 'Error en el servidor' });
            }
    
            else {
    
                if (!projects) {
                    res.status(404).send({ message: 'No hay proyectos'});
                }
    
                else {
                    res.status(200).send({ projects });
                }
            }
        });
    }

    else {
        Project.find({_id : projectId},(err,project)=>{

            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            }
    
            else {
    
                if (!project) {
                    res.status(404).send({ message: 'No se encontro proyecto'});
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
            res.status(500).send({ message: 'Error en el servidor' });
        }

        else {

            if (!projectUpdate) {
                res.status(404).send({ message: 'El proyecto no existe' });
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
            res.status(500).send({ message: 'Error en el servidor' });
        }

        else {

            if (!projectRemove) {
                res.status(404).send({ message: 'El proyecto no existe' });
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