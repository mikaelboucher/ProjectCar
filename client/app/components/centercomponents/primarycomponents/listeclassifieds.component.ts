import { Component, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { trigger, state, style,
    animate, transition } from '@angular/animations';
import { Classified } from '../../../objects/classified';
import { AnimationService } from '../../../services/animation.service';

@Component({
    selector: "listes-classifieds",
    templateUrl: './app/html/center/listeclassified.html',
    styleUrls : ['./app/css/center/listeclassified.css'],
    providers : [ AnimationService ]
})

export class ListeClassified implements AfterViewInit{
    @Input() classifieds : Classified[];
    @ViewChildren('oneclassified') elementClassified : any;
    private descriptionEnable : boolean[] = [];
    private subAnimation : any;

    constructor(private animmationService : AnimationService){}
    
    ngAfterViewInit(){
        this.elementClassified = this.elementClassified.toArray();
        this.animmationService.init(this.elementClassified);
        this.showDescription();
    }

    mouseOver(position : number, enter : boolean){
        if (enter){
            this.animmationService.mouseover(position);
        }else{
            this.animmationService.mouseleave(position);
        }
    }
    
    private showDescription(){
        this.subAnimation = this.animmationService.onDone.subscribe( (status : any) => {
            this.descriptionEnable[status.index] = status.mouseOver;
        });
    }
 }
