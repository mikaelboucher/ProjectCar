import { Component, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classfield } from '../../../objects/classfield';
import { AnimationService } from '../../../services/animation.service'

const STATES = ["normal", "mouseOver", "leftMove", "rightMove"];
const SIZES = ["default", "maximise", "minimise"];

@Component({
    selector: "listes-classfieds",
    templateUrl: './app/html/center/listeclassfield.html',
    styleUrls : ['./app/css/center/listeclassfield.css'],
    providers : [ AnimationService ]
})

export class ListeClassfields implements AfterViewInit{
    @Input() classfields : Classfield[];
    @ViewChildren('oneclassfield') elementClassfield : any;
    private focusMouseOver : number;

    constructor(private animmationService : AnimationService){}
    
    ngAfterViewInit(){
        this.elementClassfield = this.elementClassfield.toArray();
        this.animmationService.init(this.elementClassfield);
    }

    mouseOver(position : number, enter : boolean){
        if (enter){
            this.animmationService.mouseover(position);
        }else{
            this.animmationService.mouseleave(position);
        }
    }
    
 }
