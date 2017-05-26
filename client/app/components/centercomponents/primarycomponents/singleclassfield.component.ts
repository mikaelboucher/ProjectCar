import { Component, Input } from '@angular/core';
import { Classfield } from '../../../objects/classfield'

@Component({
    selector: "single-classfield",
    templateUrl: './app/html/center/singleclassfield.html',
    styleUrls : ['./app/css/center/singleclassfield.css']
})



export class SingleClassfield {

   @Input()
   classfield: Classfield;


 }