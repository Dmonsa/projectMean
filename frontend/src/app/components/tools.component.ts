import { Component, OnInit } from '@angular/core';
import { promise } from 'selenium-webdriver';

@Component({
    selector: 'tools',
    templateUrl: '../views/tools.html',
    providers: [],
    //styleUrls: ['../styles/user.css'],
})

export class ToolsComponent {
    public titulo: string;



    constructor(

    ) {

        this.titulo = 'Integration Tools';



    }

    ngOnInit() {
        console.log('user-edit.component cargado');
    }

}