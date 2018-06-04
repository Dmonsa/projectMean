import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../models/project.model';
import { promise } from 'selenium-webdriver';
import { global } from '../globals/global';
import * as moment from 'moment';


@Component({
    selector: 'prjects',
    templateUrl: '../views/projectEdit.html',
    providers: [ProjectService],
    //styleUrls: ['../styles/user.css'],
})

export class ProjectEditComponent {
    public titulo: 'PROJECTS';
    public pj: Project;
    public token;
    public identity;
    public alertMessage;
    public errorMessage;
    public url;
    public usersList;
    public viewUsersList = false;
    public viewUsers = true;
    public title;

    constructor(
        private _projecService: ProjectService, private _route: Router,
        private _router: ActivatedRoute,
    ) {

        //LocalStorage...
        this.identity = this._projecService.getIdentity();
        this.token = this._projecService.getToken();
        this.title = 'Edit User';
        this.pj = new Project('', new Date(), new Date(), '', '', '', '');
    }

    ngOnInit() {
        this.projectEdit();

    }



    listProjects() {

        this._projecService.listProjects(null, this.token).subscribe(

            result => {
                console.log(result);
                console.log(result.message);
                this.usersList = result.message;
                console.log(this.usersList);
                this.viewUsersList = true;
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

    projectEdit() {
        this._router.params.forEach((params: Params) => {
            let id = params['id'];
            console.log(id);
            this._projecService.listProjects(id, this.token).subscribe(

                response => {
                    if (!response.project) {
                        this._route.navigate(['/']);
                    }
                    else {

                        var y = response.project;
                        let now = moment(y.dateIn);
                        //this.pj.dateIn = now.format('YYYY-MM-DD');
                        var e = document.getElementById("hola");
                        var t = now.format('YYYY-MM-DD');
                       var  u = now.date();
                    
                        // this.pj.dateIn = document.getElementById("hola");
                        var r = new Project(y.nombre,new Date(), y.dateFn, y.tool1, y.tool2, y.tool3, y.tool);
                        console.log(r);
                        console.log(u);
                    }
                },

                err => {
                    console.log(err);
                    let errorMessage = <any>err;
                    if (errorMessage != null) {
                        let body = JSON.parse(err._body);
                        //this.errorMessage = body.message;
                        console.log(body.message);
                    }
                }
            )

        });
    }
}