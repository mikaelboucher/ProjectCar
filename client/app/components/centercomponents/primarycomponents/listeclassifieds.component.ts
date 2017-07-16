import { Component, Input, Output, EventEmitter, ViewChildren, AfterViewInit } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classified } from '../../../objects/classified';

import { MouseOverService } from '../../../services/animation/mouseover.service';

@Component({
    selector: "listes-classifieds",
    templateUrl: './app/html/center/listeclassified.html',
    styleUrls : ['./app/css/center/listeclassified.css'],
    providers : [ MouseOverService ]
})

export class ListeClassified implements AfterViewInit{
    @Input() id : number;
    @Input() classifieds : Classified[];
    @Output() onClick = new EventEmitter<Classified>(); 
    @ViewChildren('oneclassified') elementClassified : any;
    private descriptionEnable : boolean[] = [];
    private subAnimation : any;

    constructor(private mouseOverService : MouseOverService){}
    
    ngAfterViewInit(){
        this.elementClassified = this.elementClassified.toArray();
        this.mouseOverService.init(this.elementClassified);
        this.showDescription();
    }

    click(position : number){
        this.mouseOverService.cancel();
        this.onClick.emit(this.classifieds[position]);
    }

    mouseOver(position : number, enter : boolean){
        if (enter){
            this.mouseOverService.mouseover(position);
        }else{
            this.mouseOverService.mouseleave(position);
        }
    }
    
    private showDescription(){
        this.subAnimation = this.mouseOverService.onDone.subscribe( (status : any) => {
            this.descriptionEnable[status.index] = status.mouseOver;
        });
    }
 }
