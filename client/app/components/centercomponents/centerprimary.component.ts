import { Component, Input, Output } from '@angular/core';
import { OptionService } from './../../services/optionservice';

@Component({
    selector: "center-primary",
    templateUrl: './app/html/center/centerprimary.html',
    styleUrls : ['./app/css/center/centerprimary.css']
})
export class CenterPrimary {
    private postingAd : boolean;

    constructor(public optionService: OptionService){

    }


    isOption(option: String): boolean{
        return this.optionService.currentOption === option;
    }

    postAd(){
        this.postingAd = true;
    }

}
