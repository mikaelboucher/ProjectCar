import { Component, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield';
import { ClassfieldState } from '../../../utils/animation/classfieldAnimation';
import { AnimationService } from '../../../services/animation.service'

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
    private focusMouseOver : number;

    constructor(private animmationService : AnimationService){}

    ngAfterViewInit(){
        this.elementClassfield = this.elementClassfield.toArray();
    }

    mouseOver(classfield : Classfield, position : number, enter : boolean){
        if (enter){
            this.manageStateIn(classfield, position);
        }else{
            this.manageStateOut();
        }
    }

    manageStateIn(classfiedCible : Classfield, posFocus : number){
        if (posFocus !== this.focusMouseOver){
            if (this.focusMouseOver){
             this.animmationService.transform({element : this.elementClassfield[this.focusMouseOver],
                    position : this.focusMouseOver, focus : true }, false, false);
            }
            this.classfields.forEach((classfield, nbClassfield)=> {
                let focus = nbClassfield === posFocus;
                let left = nbClassfield < posFocus;
                if (nbClassfield !== this.focusMouseOver){
                    this.animmationService.transform({element : this.elementClassfield[nbClassfield],
                        position : nbClassfield, focus : focus }, true , left);
                }
            });
            this.focusMouseOver = posFocus;
        }
    }

    manageStateOut(){
        this.classfields.forEach( (classfield, nbClassfield) => {
            let focus = nbClassfield === this.focusMouseOver;
            let left = nbClassfield < this.focusMouseOver;
            if (nbClassfield !== this.focusMouseOver){
                this.animmationService.transform({element : this.elementClassfield[nbClassfield],
                    position : nbClassfield, focus : focus }, false , left);
            }
        });
        this.focusMouseOver = undefined;
    }

    onResize(event : any){
        
    }
    
 }
