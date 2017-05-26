import { Component } from '@angular/core';
import { Classfield } from '../../../objects/classfield'

@Component({
    selector: "classfields-component",
    templateUrl: './app/html/center/classfields.html'
})



export class Classfields {

    classfieldsList: Classfield[] = [];

    constructor(){
        this.classfieldsList.push(new Classfield("yo", "yo", 123, undefined))
    }


 }
