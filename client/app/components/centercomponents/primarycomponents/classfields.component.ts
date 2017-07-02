import { Component, AfterViewInit } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { AnimationService } from '../../../services/animation.service';
import { Classfield } from '../../../objects/classfield'

const DEFAULT_CLASSIFIELD_ROW = 4;

@Component({
    selector: "classfields-component",
    templateUrl: './app/html/center/classfields.html',
    styleUrls : ['./app/css/center/classfields.css'],
    providers : [QueryService, AnimationService]
})

export class Classfields implements AfterViewInit{
    groupClassfields : Classfield[][] = [];
    classifields : Classfield[];
    nbClassifieldRow : number;

    constructor(private queryService : QueryService,
    private animationService : AnimationService){
        this.queryService.getCars().then( classfields => {
            this.classifields = classfields;
            this.initGroups(classfields);
        });
    }

    ngAfterViewInit() {
        this.nbClassifieldRow = this.animationService.changeDimension(+window.innerWidth, true);
        setTimeout(() => this.initGroups(this.classifields), 100);
    }
    
    initGroups(classfieldsList : Classfield[]){
        let nbGroups = 0;
        classfieldsList.forEach( (classfied, cpt) => {
            if (cpt % this.nbClassifieldRow === 0){
                this.groupClassfields[nbGroups] = [];
                nbGroups++;
            }
            this.groupClassfields[nbGroups - 1][cpt % this.nbClassifieldRow] = classfied;
        });
    }

    onResize(event : any){
        let width = event.target.innerWidth;
        let dimension = this.animationService.changeDimension(width);
        if (this.nbClassifieldRow !== dimension){
            this.nbClassifieldRow = dimension;
            this.initGroups(this.classifields);
        }
    }
    
}
