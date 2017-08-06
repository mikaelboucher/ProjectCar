import { Component } from '@angular/core';

import { InstanceCropService } from '../../../services/instancecrop.service';

@Component({
    selector: "post-ad",
    templateUrl: './app/html/center/postad.html',
    styleUrls : ['./app/css/center/postad.css']
})

export class PostAdComponent{
    private title : string;
    private price : number;
    private description : string;
    private profileURL : string
    private imagesURL : string[];
    private test : boolean;

    constructor(){
        this.imagesURL = [];
    }

    changeDescription(event : any){
        this.description = event.target.value;
    }

    changeProfil(url : string){
        this.profileURL = url;
    }
}