import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../models/project.model';
import { promise } from 'selenium-webdriver';
import { global } from '../globals/global';

@Component({
    selector: 'users',
    templateUrl: '../views/projectEdit.html',
    providers: [ProjectService],
    //styleUrls: ['../styles/user.css'],
})

export class UserEditComponent {
    public titulo: 'USERS';
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
        this.title = 'Edit Project';
        this.pj = new Project('', new Date(), new Date(), '', '', '', '');
    }

    ngOnInit() {
        this.userEdit();
    }

   

    listUsers() {

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

    userEdit() {
        this._router.params.forEach((params: Params) => {
            let id = params['id'];
            console.log(id);
            this._projecService.listProjects(id,this.token).subscribe(

                response => {
                    if (!response.project) {
                        this._route.navigate(['/']);
                    }
                    else {
                       
                       var y = response.project;
  
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