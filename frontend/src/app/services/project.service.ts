import { Injectable } from '@angular/core'; //  Inyectar los servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; // Realizar peticiones
import 'rxjs/add/operator/map'; // Mapear datos ú objetos
import { Observable } from 'rxjs/Observable'; // recoger las respuestas de las peticiones
import { global } from '../globals/global';


@Injectable()

export class ProjectService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = global.url;
    }


    createProject(pj, token) {

        let json = JSON.stringify(pj);
        let params = json;
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        );

        return this._http.post(this.url + 'project', params, { headers: headers })
            .map(res => res.json());
    }

    listProjects(id, token) {

        let headers = new Headers(
            {
                'Content-Type': 'application/json'
            }
        );

        let options = new RequestOptions({ headers: headers })

        var ruta;

        if (id) {
          ruta =  this.url + 'projects/' + id;
          console.log(ruta);
        }

        else {
          ruta =  this.url + 'projects';
          console.log(ruta);
        }

        return this._http.get(ruta, options)
            .map(res => res.json());
    }

    updateUser(user_to_update) {
        let json = JSON.stringify(user_to_update);
        let params = json;
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            }
        );

        return this._http.put(this.url + '/update/:id' + user_to_update._id, params, { headers: headers })
            .map(res => res.json());
    }

    getIdentity() {

        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != 'undefined') {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {

        let token = localStorage.getItem('token');
        if (token != 'undefined') {
            this.token = token;
        }
        else {
            this.token = null;
        }

        return this.token;

    }
}