import { Component, Input, Output } from '@angular/core';
import { OptionService } from './../../services/optionservice';

@Component({
    selector: "center-secondary",
    templateUrl: './app/html/center/centersecondary.html'
})
export class CenterSecondary {

    constructor(public optionService: OptionService){

    }

    displayOption(){
        console.log(this.optionService.currentOption);
    }
 }
