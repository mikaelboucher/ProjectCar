import { Component, Input } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield'

const STATES = ["normal", "mouseOver", "leftMove", "rightMove"];
const TAILLE = ["default", "maximise", "minimise"];
const DEFAULT_BORDURE = "defaultBordure";
const MOUSEOVER_BORDURE = "mouseOverBordure";

@Component({
    selector: "listes-classfieds",
    templateUrl: './app/html/center/listeclassfield.html',
    styleUrls : ['./app/css/center/listeclassfield.css'],
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

export class ListeClassfields {
    @Input() classfields : Classfield[];

    mouseOver(classfield : Classfield, enter : boolean){
        if (enter){
            this.gestionStateIn(classfield);
        }else{
            this.gestionStateOut();
        }
    }

    gestionStateIn(classfiedCible : Classfield){
        let trouve = false;
        this.classfields.forEach((classfield, nbClassfield)=> {
            if (trouve){
                classfield.setState(STATES[3]);
                classfield.setTaille(TAILLE[2]);
            }else{
                trouve = classfiedCible == classfield;
                if (trouve){
                    classfield.setState(STATES[1]);
                    classfield.setTaille(TAILLE[1]);
                }else{
                    classfield.setState(STATES[2]);
                    classfield.setTaille(TAILLE[2]);
                }
            }
        });
    }

    gestionStateOut(){
        this.classfields.forEach( (classfield, nbClassfield) => {
            classfield.setTaille(TAILLE[0]);
            classfield.setState(STATES[0]);
        });
    }
    
 }
