import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user.model';
import { promise } from 'selenium-webdriver';
import { global } from '../globals/global';

@Component({
    selector: 'users',
    templateUrl: '../views/users.html',
    providers: [UserService],
    //styleUrls: ['../styles/user.css'],
})

export class UsersComponent {
    public titulo: 'USERS';
    public user: User;
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
        this.user = this.identity;
        this.url = global.url;
        
       

        //LocalStorage...
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;

    }

    ngOnInit() {
        console.log('users.component loading');
    }

    onSubmit() {
        this._userService.register(this.user).subscribe(
            //console.log(this.user);
            response => {
               
                if(!response.user){
                    this.alertMessage = "Error en el servidor";
                }
                else {
                    this.user = response.user;
                    this.alertMessage = "El usuario se ha creado correctamente";
                    this.user = new User('', '', '','','', '','');
                    this._route.navigate(['/usuario',response._id]);
                }
            },
            err => {
                console.log(err);
                let errorMessage = <any>err;
                if (errorMessage != null) {
                    let body = JSON.parse(err._body);
                    this.errorMessage = body.message;
                    console.log(body.message);
                }
            }
        )
    }

    listUsers(){
    
        this._userService.listUsers(null,this.token).subscribe(
    
          result=>{
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
}