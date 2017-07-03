import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Classified } from '../objects/classified';
import { Converter } from '../utils/converter';

@Injectable()
export class QueryService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private porscheClassified = 'http://localhost:3002/api/porsches';
 

  constructor(private http: Http) { }

    getCars() : Promise< Classified[] > {
        return this.http
        .get(this.porscheClassified)
        .toPromise()
        .then(res => {
            let rawClassified = res.json();
            if (rawClassified){
                return Converter.convertClassifiled(rawClassified);
            }else{
                return [];
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}
