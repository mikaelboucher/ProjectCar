import { Component, Input, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { Classified } from '../../../../objects/classified'

const MAX_CHARACTER = 120;
const DOTDOTDOT = 3;

@Component({
    selector: "single-classified",
    templateUrl: './app/html/center/singleclassified.html',
    styleUrls : ['./app/css/center/singleclassified.css']
})

export class SingleClassified implements OnChanges{
   @Input() classified: Classified;
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
       if (this.classified){
           this.shrinkClassified();
       }
   }

   shrinkClassified(){
       let text = this.classified.getDescription();
       if (text.length > MAX_CHARACTER + DOTDOTDOT){
           text = text.slice(0, MAX_CHARACTER);
           text += '...';
       }
       this.shortDescription = text;
   }

 }