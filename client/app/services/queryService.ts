import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Classfield } from '../objects/classfield';
import { Converter } from '../utils/converter';

@Injectable()
export class QueryService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private porscheClassfield = 'http://localhost:3002/api/porsches';
 

  constructor(private http: Http) { }

    getCars() : Promise< Classfield[] > {
        return this.http
        .get(this.porscheClassfield)
        .toPromise()
        .then(res => {
            let rawClassfields = res.json();
            if (rawClassfields){
                return Converter.convertClassfield(rawClassfields);
            }else{
                return [];
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}
