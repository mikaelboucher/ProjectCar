import { Component, Input, ViewChildren, AfterViewInit } from '@angular/core';
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
    @Input() classifieds : Classified[];
    @ViewChildren('oneclassified') elementClassified : any;
    private descriptionEnable : boolean[] = [];
    private subAnimation : any;

    constructor(private mouseOverService : MouseOverService){}
    
    ngAfterViewInit(){
        this.elementClassified = this.elementClassified.toArray();
        this.mouseOverService.init(this.elementClassified);
        this.showDescription();
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
