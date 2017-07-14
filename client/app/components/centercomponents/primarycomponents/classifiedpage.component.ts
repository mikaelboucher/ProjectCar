import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Classified } from '../../../objects/classified';

@Component({
    selector: "classified-page",
    templateUrl: './app/html/center/classifiedpage.html',
    styleUrls : ['./app/css/center/classifiedpage.css']
})

export class ClassifiedPageComponent{
    @Input() classified : Classified;
    @Output() exit = new EventEmitter();
}

