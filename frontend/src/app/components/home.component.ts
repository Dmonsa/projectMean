import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { error } from 'selenium-webdriver';
import { global } from '../globals/global';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html',
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  public title = 'GSD';
  public user: User;
  public userRegister: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url;

  constructor(private _userService: UserService, private _router: Router) {
    this.user = new User('', '', '', '', '','', 'ROLE_USER');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', 'ROLE_USER');
    this.url = global.url;
  }

  ngOnInit() {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit() {
    //conseguir los datos del usuario identificado...
    var t = this._userService.signUp(this.user,null).subscribe(

      response => {

        var identity = response.user;
        this.identity = identity;

        console.log("si");

        if (!this.identity._id) {
          alert("El usuario no esta correctamente identificado");
        }
        else {
          //Crear elemento en el local storage para tener el usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));
          //coseguir el token para enviarlo a cada petición http...
          console.log("Hola entre 1");
          var t = this._userService.signUp(this.user, 'true').subscribe(

            response => {

              let token = response.token;
              this.token = token;

              if (this.token <= 0) {
                alert("El usuario no esta correctamente identificado");
              }

              else {
                //Crear elemento en el local storage para tener el token disponible...
                console.log("Hola entre 2");
                localStorage.setItem('token', token);
               //Redirigimos hacie el home
               console.log("Hola entre");
               this._router.navigate(['/home']);
               
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

  onSubmitRegister() {

    this._userService.register(this.userRegister).subscribe(
      response => {
        let user = response.user;
        if(!user._id){
         this.alertRegister = 'Error al registrarse';
        }
        else{
            this.alertRegister = 'El registro se ha realizado correctamente, identificate con '+ this.userRegister.email;
            this.userRegister = new User('', '', '', '', '', '', 'ROLE_USER');
        }
      },
      err => {
        let errorMessage = <any>err;
        if (errorMessage != null) {
          let body = JSON.parse(err._body);
          this.alertRegister = body.message;
        }
      });
  }

  logout() {

    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.user = new User('', '', '', '', '', '','ROLE_USER');
    //this._router.navigate(['/']);
  }
}