import { Component, Input } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield';
import { AnimationData } from '../../../utils/animationdata';
import { ClassfieldState, ClassfieldSize } from '../../../utils/animation/classfieldAnimation';

const STATES = ["normal", "mouseOver", "leftMove", "rightMove"];
const SIZES = ["default", "maximise", "minimise"];

@Component({
    selector: "listes-classfieds",
    templateUrl: './app/html/center/listeclassfield.html',
    styleUrls : ['./app/css/center/listeclassfield.css'],
    animations: [ ClassfieldState, ClassfieldSize ]
})

export class ListeClassfields {
    @Input() classfields : Classfield[];
    animationData = new AnimationData();

    constructor(){}

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

    onResize(event : any){
        this.animationData.changeWidthSelection(event.target.innerWidth);
    }
    
 }
