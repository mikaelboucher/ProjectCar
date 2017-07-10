import { Component, Input, Output } from '@angular/core';
import { OptionService } from './../../services/optionservice';

@Component({
    selector: "center-options",
    templateUrl: './app/html/center/centeroptions.html',
    styleUrls : ['./app/css/center/centeroption.css']
})
export class CenterOptions {


    constructor(public optionService: OptionService){

    }

    toNews(){
        this.optionService.currentOption = "news";
        console.log(this.optionService.currentOption);
    }

    toClassifieds(){
        this.optionService.currentOption = "classifieds";
        console.log(this.optionService.currentOption);
    }

    toShop(){
        this.optionService.currentOption = "shop";
        console.log(this.optionService.currentOption);
    }


}
