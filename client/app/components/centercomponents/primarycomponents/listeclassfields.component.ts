import { Component, Input } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield'

const STATES = ["normal", "mouseOver", "leftMove", "rightMove"];
const SIZES = ["default", "maximise", "minimise"];

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
                transform: 'translateX(-15.5%) scale(1)'
            })),
            state(STATES[3],   style({
                transform: 'translateX(15.5%) scale(1)'
            })),
            transition('normal <=> mouseOver', animate('500ms ease-in')),
            transition('normal <=> leftMove', animate('500ms ease-in')),
            transition('normal <=> rightMove', animate('500ms ease-in')),
        ]),
        trigger('classfieldSize', [
            state(SIZES[0], style({
                width : '25%'
            })),
            state(SIZES[1],   style({
                width : '31%'
            })),
            state(SIZES[2],   style({
                width : '23%'
            })),
            transition('default <=> maximise', animate('500ms ease-in')),
            transition('default <=> minimise', animate('500ms ease-in'))
        ])
  ]
})

export class ListeClassfields {
    @Input() classfields : Classfield[];

    mouseOver(classfield : Classfield, enter : boolean){
        if (enter){
            this.manageStateIn(classfield);
        }else{
            this.manageStateOut();
        }
    }

    manageStateIn(classfiedCible : Classfield){
        let find = false;
        this.classfields.forEach((classfield, nbClassfield)=> {
            if (find){
                classfield.setState(STATES[3]);
                classfield.setSize(SIZES[2]);
            }else{
                find = classfiedCible == classfield;
                if (find){
                    classfield.setState(STATES[1]);
                    classfield.setSize(SIZES[1]);
                }else{
                    classfield.setState(STATES[2]);
                    classfield.setSize(SIZES[2]);
                }
            }
        });
    }

    manageStateOut(){
        this.classfields.forEach( (classfield, nbClassfield) => {
            classfield.setSize(SIZES[0]);
            classfield.setState(STATES[0]);
        });
    }
    
 }
