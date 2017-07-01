import { Component, Input, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { Classfield } from '../../../objects/classfield'

const MAX_CHARACTER = 120;
const DOTDOTDOT = 3;

@Component({
    selector: "single-classfield",
    templateUrl: './app/html/center/singleclassfield.html',
    styleUrls : ['./app/css/center/singleclassfield.css']
})

export class SingleClassfield implements OnChanges{
   @Input() classfield: Classfield;
   @Input() showDescription : boolean;
   @Output() mouseOver = new EventEmitter();
   isMouseOver : boolean;
   shortDescription : string;

   @HostListener('mouseover') onMouseEnter() {
       this.isMouseOver = true;
       this.mouseOver.emit(true);
   }

   @HostListener('mouseleave') onmouseleave() {
       this.isMouseOver = false;
       this.mouseOver.emit(false);
   }

   ngOnChanges(){
       if (this.classfield){
           this.shrinkClassfield();
       }
   }

   shrinkClassfield(){
       let text = this.classfield.getDescription();
       if (text.length > MAX_CHARACTER + DOTDOTDOT){
           text = text.slice(0, MAX_CHARACTER);
           text += '...';
       }
       this.shortDescription = text;
   }

 }