import { Component } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield'

const NB_ALIGN_BUTTON = 4;

@Component({
    selector: "classfields-component",
    templateUrl: './app/html/center/classfields.html',
    styleUrls : ['./app/css/center/classfields.css']
})

export class Classfields {
    groupClassfields : Classfield[][] = [];

    constructor(){
        let classfieldsList : Classfield[] = [];
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        this.initGroups(classfieldsList);
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
    
 }
