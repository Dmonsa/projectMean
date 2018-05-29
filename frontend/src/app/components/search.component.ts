import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { error } from 'selenium-webdriver';
import { global } from '../globals/global';

@Component({
    selector: 'search',
    templateUrl: '../views/search.html',
    providers: []
})
export class SearchComponent implements OnInit {
    public title = '';
    public user: User;
    public errorMessage;
    public alertRegister;
    public url;

    constructor(private _userService: UserService, private _router: Router) {
        this.user = new User('', '', '', '', '', '', 'ROLE_USER');
        this.url = global.url;
    }

    ngOnInit() {

    }

}