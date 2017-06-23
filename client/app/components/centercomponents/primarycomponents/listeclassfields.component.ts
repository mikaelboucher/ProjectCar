import { Component, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield';
import { AnimationData } from '../../../utils/animationdata';
import { ClassfieldState } from '../../../utils/animation/classfieldAnimation';
import { AnimationService } from '../../../services/animationService'

const STATES = ["normal", "mouseOver", "leftMove", "rightMove"];
const SIZES = ["default", "maximise", "minimise"];

@Component({
    selector: "listes-classfieds",
    templateUrl: './app/html/center/listeclassfield.html',
    styleUrls : ['./app/css/center/listeclassfield.css'],
    providers : [ AnimationService ],
    animations: [ ClassfieldState ]
})

export class ListeClassfields implements AfterViewInit{
    @Input() classfields : Classfield[];
    @ViewChildren('oneclassfield') elementClassfield : any;
    animationData = new AnimationData();

    constructor(private animmationService : AnimationService){}

    ngAfterViewInit(){
        this.elementClassfield = this.elementClassfield.toArray();
    }

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
                this.animmationService.changeWidth(this.elementClassfield[nbClassfield],
                nbClassfield, classfield.getWidth(), 22);
                classfield.setWidth(34);
            }else{
                find = classfiedCible == classfield;
                let width;
                if (find){
                    classfield.setState(STATES[1]);
                    classfield.setSize(SIZES[1]);
                    width = 34;
                }else{
                    classfield.setState(STATES[2]);
                    classfield.setSize(SIZES[2]);
                    width = 22;
                }
                this.animmationService.changeWidth(this.elementClassfield[nbClassfield],
                nbClassfield, classfield.getWidth(), width);
                classfield.setWidth(width);
            }
        });
    }

    manageStateOut(){
        this.classfields.forEach( (classfield, nbClassfield) => {
            classfield.setSize(SIZES[0]);
            classfield.setState(STATES[0]);
            this.animmationService.changeWidth(this.elementClassfield[nbClassfield],
            nbClassfield, classfield.getWidth(), 25);
            classfield.setWidth(25);
        });
    }

    onResize(event : any){
        
    }
    
 }
