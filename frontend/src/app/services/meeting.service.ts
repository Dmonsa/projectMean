import { Injectable } from '@angular/core'; //  Inyectar los servicios
import { Http, Response, Headers } from '@angular/http'; // Realizar peticiones
import 'rxjs/add/operator/map'; // Mapear datos ú objetos
import { Observable } from 'rxjs/Observable'; // recoger las respuestas de las peticiones
import { global } from '../globals/global';

@Injectable()

export class MeetingService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = global.url;
    }

    createMeeting(meeting) {

        let json = JSON.stringify(meeting);
        let params = json;
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
            }
        );

        return this._http.post(this.url + 'reuniones', params, { headers: headers })
            .map(res => res.json());
    }

}
