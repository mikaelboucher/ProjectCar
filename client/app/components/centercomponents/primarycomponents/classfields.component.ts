import { Component } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield'

const NB_BOUTON_LIGNE = 4;

const STATES = ["normal", "mouseOver", "leftMove", "rightMove"];
const TAILLE = ["default", "maximise", "minimise"];
const DEFAULT_BORDURE = "defaultBordure";
const MOUSEOVER_BORDURE = "mouseOverBordure";

@Component({
    selector: "classfields-component",
    templateUrl: './app/html/center/classfields.html',
    styleUrls : ['./app/css/center/classfields.css'],
    animations: [
        trigger('classfieldState', [
            state(STATES[0], style({
                transform: 'translateX(0%) scale(1)'
            })),
            state(STATES[1],   style({
                transform: 'translateX(0%) scale(1.2)'
            })),
            state(STATES[2],   style({
                transform: 'translateX(-25%) scale(1)'
            })),
            state(STATES[3],   style({
                transform: 'translateX(25%) scale(1)'
            })),
            transition('normal => mouseOver, mouseOver => normal', animate('500ms ease-in')),
            transition('normal => leftMove, leftMove => normal', animate('500ms ease-in')),
            transition('normal => rightMove, rightMove => normal', animate('500ms ease-in')),
        ]),
        trigger('classfieldTaille', [
            state(TAILLE[0], style({
                width : '25%'
            })),
            state(TAILLE[1],   style({
                width : '46%'
            })),
            state(TAILLE[2],   style({
                width : '18%'
            })),
            transition('default => maximise, maximise => default', animate('500ms ease-in')),
            transition('default => minimise, minimise => default', animate('500ms ease-in'))
        ])
  ]
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

    mouseOver(classfield : Classfield, enter : boolean, index : number){
        if (enter){
            this.gestionStateIn(index, classfield);
        }else{
            this.gestionStateOut(index);
        }
    }

    gestionStateIn(index : number, classfiedCible : Classfield){
        let trouve = false;
        this.paquetsClassfield[index].forEach((classfield, nbClassfield)=> {
            if (trouve){
                classfield.changeState(STATES[3]);
                classfield.setTaille(TAILLE[2]);
            }else{
                trouve = classfiedCible == classfield;
                if (trouve){
                    classfield.changeState(STATES[1]);
                    classfield.setTaille(TAILLE[1]);
                }else{
                    classfield.changeState(STATES[2]);
                    classfield.setTaille(TAILLE[2]);
                }
            }
        });
    }

    gestionStateOut(index : number){
        this.paquetsClassfield[index].forEach( (classfield, nbClassfield) => {
            classfield.setTaille(TAILLE[0]);
            classfield.changeState(STATES[0]);
        });
    }
    
 }
