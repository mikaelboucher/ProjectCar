import { Component } from '@angular/core';
import { Classfield } from '../../../objects/classfield'

const NB_BOUTON_LIGNE = 4;

@Component({
    selector: "classfields-component",
    templateUrl: './app/html/center/classfields.html',
    styleUrls : ['./app/css/center/classfields.css']
})

export class Classfields {
    classfieldsList: Classfield[] = [];
    classfieldMouseOver : Classfield;
    indexMouseOver : number;

    constructor(){
        this.classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        this.classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        this.classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
        this.classfieldsList.push(new Classfield("yo", "yo", 123, undefined));
        this.classfieldsList.push(new Classfield("yoo1", "yosd", 124, undefined));
        this.classfieldsList.push(new Classfield("yooy", "yo", 125, undefined));
    }
    
    mouseOver(classfield : Classfield, enter : boolean, index? : number){
        if (enter){
            this.classfieldMouseOver = classfield;
            this.indexMouseOver = index;
        }else{
            this.classfieldMouseOver = undefined;
            this.indexMouseOver = undefined;
        }
    }

    memeLigne(index : number) : boolean{
        console.log(Math.floor(this.indexMouseOver/4) + " - "+ Math.floor(index/4))
        return Math.floor(this.indexMouseOver/4) === Math.floor(index/4);
    }
 }
