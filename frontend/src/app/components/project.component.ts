import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../models/project.model';
import { Meeting } from '../models/meeting.model';
import { ProjectService } from '../services/project.service';
import { MeetingService } from '../services/meeting.service';
import { global } from '../globals/global';

@Component({
  selector: 'project',
  templateUrl: '../views/project.html',
  providers: [ProjectService,MeetingService]
})
export class ProjectComponent implements OnInit {

  public title = 'Projects';
  public project: Project;
  public meetin: Meeting;
  public errorMessage;
  public alertRegister;
  public url;
  public token;
  public pj;
  public projectsList;
  public idProject;
  public initialMeeting = false;
  public meeting = true;
  public viewProjectsList = false;
  public viewProjects = true;
  
  constructor(private _projectService: ProjectService,private _meetingService: MeetingService, private _router: Router) {

    this.project = new Project('', new Date(), new Date(), '', '', '', '');
    this.meetin = new Meeting('','',new Date(),'','','');
    this.url = global.url;

  }

  ngOnInit() {

    this.token = this._projectService.getToken();

  }

  public onSubmit() {
  
    
    //conseguir los datos del usuario identificado...
    var t = this._projectService.createProject(this.project, this.token).subscribe(

      response => {
        this.pj = response.message;
        console.log("si");

        if (!this.pj) {
          alert("Nose pudo guardar el pj");
        }
        else {
         console.log("si",this.pj);
         this.idProject = this.pj._id;
         this.project = new Project('', new Date(), new Date(), '', '', '', '');
         this.initialMeeting = true;
         this.meeting = false;
        }

      },
      err => {
        if (err) {
          let errorMessage = <any>err;
          if (errorMessage != null) {
            let body = JSON.parse(err._body);
            this.errorMessage = body.message;
            console.log(body.message);
          }
        }
      }
    );
  }

  createMeeting(){

    //this.meetin.id_project = this.idProject;

    this._meetingService.createMeeting(this.meetin).subscribe(

      response => {
       var result = response.message;
        console.log("si");

        if (!result) {
          alert("Nose pudo guardar la reunion");
        }
        else {
        
         this.initialMeeting = false;
         this.meeting = true;
        }

      },
      err => {
        if (err) {
          let errorMessage = <any>err;
          if (errorMessage != null) {
            let body = JSON.parse(err._body);
            this.errorMessage = body.message;
            console.log(body.message);
          }
        }
      }
    );
  }
  cancelMeeting(){
    this.initialMeeting = false;
    this.meeting = true;
  }

  listProjects(){
    
    this._projectService.listProjects(null,this.token).subscribe(

      result=>{
        console.log(result);
        this.projectsList = result.projects;
        console.log(this.projectsList);
        this.viewProjectsList = true;
      },

      err => {
        if (err) {
          let errorMessage = <any>err;
          if (errorMessage != null) {
            let body = JSON.parse(err._body);
            this.errorMessage = body.message;
            console.log(body.message);
          }
        }
      }
    )
  }

}
