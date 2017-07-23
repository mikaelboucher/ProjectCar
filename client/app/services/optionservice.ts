import { Injectable } from '@angular/core';
import { Classified } from '../objects/classified';

@Injectable()
export class OptionService {

    currentOption = "classified";

    private selectedClassified : Classified;

    public selectClassified(classified : Classified){
        this.selectedClassified = classified;
    }

    get showClassified(){
        return this.selectedClassified;
    }

}