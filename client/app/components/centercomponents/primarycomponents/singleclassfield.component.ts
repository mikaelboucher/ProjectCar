import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Classfield } from '../../../objects/classfield'

@Component({
    selector: "single-classfield",
    templateUrl: './app/html/center/singleclassfield.html',
    styleUrls : ['./app/css/center/singleclassfield.css']
})

export class SingleClassfield {
   @Input() classfield: Classfield;
   @Output() mouseOver = new EventEmitter();

   @HostListener('mouseover') onMouseEnter() {
       this.mouseOver.emit(true);
   }

   @HostListener('mouseleave') onmouseleave() {
       this.mouseOver.emit(false);
   }

 }