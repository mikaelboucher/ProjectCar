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
            console.log(this.indexMouseOver);
        }else{
            this.classfieldMouseOver = undefined;
            this.indexMouseOver = undefined;
        }
    }

    estMouse(index : number){
        return index === this.indexMouseOver;
    }

    limite(index : number, gauche? : boolean) : boolean{
        let posEsperer = (gauche ? 0 : 3)
        return index % NB_BOUTON_LIGNE === posEsperer && !this.memeLigne(index);
    }

    memeLigne(index : number) : boolean{
        let estMemeLigne = false;
        if (this.indexMouseOver || this.indexMouseOver === 0){
            estMemeLigne = Math.trunc(index/NB_BOUTON_LIGNE) === Math.trunc(this.indexMouseOver/NB_BOUTON_LIGNE);
        }
        return estMemeLigne;
    }
 }
