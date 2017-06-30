import { Component } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { Classfield } from '../../../objects/classfield'

const NB_ALIGN_BUTTON = 4;

@Component({
    selector: "classfields-component",
    templateUrl: './app/html/center/classfields.html',
    styleUrls : ['./app/css/center/classfields.css'],
    providers : [QueryService]
})

export class Classfields {
    groupClassfields : Classfield[][] = [];

    constructor(private queryService : QueryService){
        this.queryService.getCars().then( classfields => {
            this.initGroups(classfields);
        });
    }
    
    initGroups(classfieldsList : Classfield[]){
        let nbGroups = 0;
        classfieldsList.forEach( (classfied, cpt) => {
            if (cpt % NB_ALIGN_BUTTON === 0){
                this.groupClassfields[nbGroups] = [];
                nbGroups++;
            }
            this.groupClassfields[nbGroups - 1][cpt % NB_ALIGN_BUTTON] = classfied;
        });
    }

    onResize(event : any){
        
    }
    
}
