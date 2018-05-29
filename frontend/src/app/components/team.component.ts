import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../models/team.model';
import { global } from '../globals/global';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'teams',
  templateUrl: '../views/team.html',
  providers: [TeamService]
})
export class TeamComponent implements OnInit {
  public title = 'Teams GSD';
  public team: Team;
  public errorMessage;
  public alertRegister;
  public url;
  public token;
  public tm;
  public teamsList;
  public viewteamsList = false;
  public viewteams = true;

  constructor(private _teamService: TeamService, private _router: Router) {
    this.team = new Team('', '','');
    this.url = global.url;

  }

  ngOnInit() {

    this.token = this._teamService.getToken();

  }

  public onSubmit() {
  
    //conseguir los datos del usuario identificado...
    var t = this._teamService.createTeam(this.team, this.token).subscribe(

      response => {
        this.tm = response.message;
        console.log("si");

        if (!this.tm) {
          alert("No se pudo guardar el tm");
        }
        else {
         console.log("si",this.tm);
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

  listTeams(){
    
    this._teamService.listTeams(null,this.token).subscribe(

      response=>{
        console.log(response);
        this.teamsList = response.message;
        console.log(this.teamsList);
        this.viewteamsList = true;
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
