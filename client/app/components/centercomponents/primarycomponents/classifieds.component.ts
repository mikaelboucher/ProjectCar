import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { MouseOverService } from '../../../services/animation/mouseover.service';
import { OptionService } from '../../../services/optionservice';
import { Classified } from '../../../objects/classified';
import { defaultAnimation, singleAnimation } from '../../../utils/classifiedAnimation'

const DEFAULT_CLASSIFIELD_ROW = 4;
const DELAY_TRANSITION = 700;
const TIME_FADE_TO_BLACK = 1000;

@Component({
    selector: "classifieds-component",
    templateUrl: './app/html/center/classifieds.html',
    styleUrls : ['./app/css/center/classifieds.css'],
    providers : [QueryService, MouseOverService, OptionService],
    animations : [defaultAnimation, singleAnimation]
})

export class ClassifiedComponent implements AfterViewInit {
    groupClassifieds : Classified[][] = [];
    classifieds : Classified[];
    nbClassifiedRow = DEFAULT_CLASSIFIELD_ROW;
    start = "";
    savePointScrollbar : number;

    constructor(private queryService : QueryService,
    private mouseOverService : MouseOverService,
    private optionService : OptionService){
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
        this.savePointScrollbar = window.scrollY;
        window.scrollTo(0, 0);
        this.optionService.selectClassified(selectClassified);
        this.generateBlackColor(true);
    }

    goBack(){
        this.optionService.selectClassified(undefined);
        this.generateBlackColor(false);
        this.restoreScrollbar();
    }

    restoreScrollbar(){
        setTimeout( () => {
            window.scrollBy(0, this.savePointScrollbar);
            this.savePointScrollbar = undefined;
        }, DELAY_TRANSITION);
    }

    generateBlackColor(start : boolean){
        this.start = start ? "start" : "end";
        setTimeout(() => this.start = "", TIME_FADE_TO_BLACK);
    }
}
