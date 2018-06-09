import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../models/project.model';
import { promise } from 'selenium-webdriver';
import { global } from '../globals/global';

@Component({
    selector: 'users',
    templateUrl: '../views/user-edit.html',
    providers: [UserService],
    //styleUrls: ['../styles/user.css']
})

export class UserEditComponent {
    public title = "USER EDIT";
    public token;
    public identity;
    public alertMessage;
    public errorMessage;
    public url;
    public usersList;
    public viewUsersList = false;
    public viewUsers = true;
    

    constructor(
        private _userService: UserService, private _route: Router,
        private _router: ActivatedRoute,
    ) {
 
        //LocalStorage...
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        //this.pj = new Project('', new Date(), new Date(), '', '', '', '');
    }

    ngOnInit() {
        this.userEdit();
    }

   

    listUsers() {

         this._userService.listUsers(null, this.token).subscribe(

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
            this._userService.listUsers(id,this.token).subscribe(

                response => {
                    if (!response.message) {
                        this._route.navigate(['/']);
                    }
                    else {
                       
                       var y = response.message;
  
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