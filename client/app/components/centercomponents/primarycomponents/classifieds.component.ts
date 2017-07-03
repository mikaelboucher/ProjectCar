import { Component, AfterViewInit } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { AnimationService } from '../../../services/animation.service';
import { Classified } from '../../../objects/classified'

const DEFAULT_CLASSIFIELD_ROW = 4;

@Component({
    selector: "classifieds-component",
    templateUrl: './app/html/center/classifieds.html',
    styleUrls : ['./app/css/center/classifieds.css'],
    providers : [QueryService, AnimationService]
})

export class ClassifiedComponent implements AfterViewInit{
    groupClassifieds : Classified[][] = [];
    classifieds : Classified[];
    nbClassifiedRow : number;

    constructor(private queryService : QueryService,
    private animationService : AnimationService){
        this.queryService.getCars().then( classifieds => {
            this.classifieds = classifieds;
            this.initGroups(classifieds);
        });
    }

    ngAfterViewInit() {
        this.nbClassifiedRow = this.animationService.changeDimension(+window.innerWidth, true);
        setTimeout(() => this.initGroups(this.classifieds), 100);
    }
    
    initGroups(classifiedsList : Classified[]){
        let nbGroups = 0;
        classifiedsList.forEach( (classified, cpt) => {
            if (cpt % this.nbClassifiedRow === 0){
                this.groupClassifieds[nbGroups] = [];
                nbGroups++;
            }
            this.groupClassifieds[nbGroups - 1][cpt % this.nbClassifiedRow] = classified;
        });
    }

    onResize(event : any){
        let width = event.target.innerWidth;
        let dimension = this.animationService.changeDimension(width);
        if (this.nbClassifiedRow !== dimension){
            this.nbClassifiedRow = dimension;
            this.initGroups(this.classifieds);
        }
    }
    
}
