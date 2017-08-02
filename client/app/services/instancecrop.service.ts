import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InstanceCropService {
    private listener : Subject<any>;

    constructor(){
        this.listener = new Subject<any>();
    }

    public observable() : Observable<any>{
        return this.listener.asObservable();
    }
    
    public wakeUp(){
        this.listener.next();
    }

    public send(url : string){
        this.listener.next(url);
    }

}