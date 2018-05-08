import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PeticionService {
    public url: string;

    constructor( private _http:Http ){
        this.url = "https://api.myjson.com/bins/1e4uje";
    }

    getArticulos() {
        return this._http.get(this.url)
            .map(res => res.json());
    }
}