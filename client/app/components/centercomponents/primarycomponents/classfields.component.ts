import { Component } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield'

const NB_BOUTON_LIGNE = 4;

@Component({
    selector: "classfields-component",
    templateUrl: './app/html/center/classfields.html',
    styleUrls : ['./app/css/center/classfields.css']
})

export class Classfields {
    paquetsClassfield : Classfield[][] = [];

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
        this.initPaquets(classfieldsList);
    }
    
    initPaquets(classfieldsList : Classfield[]){
        let nbPaquet = 0;
        classfieldsList.forEach( (classfied, cpt) => {
            if (cpt % NB_BOUTON_LIGNE === 0){
                this.paquetsClassfield[nbPaquet] = [];
                nbPaquet++;
            }
            this.paquetsClassfield[nbPaquet - 1][cpt % NB_BOUTON_LIGNE] = classfied;
        });
    }
    
 }
