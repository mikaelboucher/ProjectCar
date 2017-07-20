import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { MouseOverService } from '../../../services/animation/mouseover.service';
import { Classified } from '../../../objects/classified';
import { defaultAnimation, singleAnimation } from '../../../utils/classifiedAnimation'

const DEFAULT_CLASSIFIELD_ROW = 4;

@Component({
    selector: "classifieds-component",
    templateUrl: './app/html/center/classifieds.html',
    styleUrls : ['./app/css/center/classifieds.css'],
    providers : [QueryService, MouseOverService],
    animations : [defaultAnimation, singleAnimation]
})

export class ClassifiedComponent implements AfterViewInit {
    groupClassifieds : Classified[][] = [];
    classifieds : Classified[];
    nbClassifiedRow = DEFAULT_CLASSIFIELD_ROW;
    selectClassified : Classified;
    start = "";
    scrollbarPosition : number;

    constructor(private queryService : QueryService,
    private mouseOverService : MouseOverService){
        this.queryService.getCars().then( classifieds => {
            this.classifieds = classifieds;
            this.initGroups(classifieds);
        });
    }

    ngAfterViewInit() {
        this.nbClassifiedRow = this.mouseOverService.changeDimension(+window.innerWidth, true);
        setTimeout(() => this.initGroups(this.classifieds), 100);
    }

    initGroups(classifiedsList : Classified[]){
        let nbGroups = 0;
        this.groupClassifieds = [];
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
        let dimension = this.mouseOverService.changeDimension(width);
        if (this.nbClassifiedRow !== dimension){
            this.nbClassifiedRow = dimension;
            this.initGroups(this.classifieds);
        }
    }

    click(selectClassified : Classified){
        this.scrollbarPosition = window.scrollY;
        window.scrollTo(0, 0);
        this.selectClassified = selectClassified;
        this.generateBlackColor(true);
    }

    goBack(){
        this.selectClassified = undefined;
        this.generateBlackColor(false);
        this.restoreScrollbar();
    }

    restoreScrollbar(){
        setTimeout( () => {
            if (this.scrollbarPosition && !this.selectClassified){
                window.scrollBy(0, this.scrollbarPosition);
                this.scrollbarPosition = undefined;
            }else{
                console.log('error');
            }
        }, 700);
    }

    generateBlackColor(start : boolean){
        this.start = start ? "start" : "end";
        setTimeout(() => this.start = "", 1000);
    }
}
