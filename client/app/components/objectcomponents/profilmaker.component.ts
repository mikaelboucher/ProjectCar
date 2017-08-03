import { Component, OnDestroy } from '@angular/core';

import { InstanceCropService } from '../../services/instancecrop.service';

@Component({
    selector: "profil-maker",
    templateUrl: './app/html/object/profilemaker.html',
    styleUrls : ['./app/css/object/profilemaker.css']
})

export class ProfilMakerComponent{
    private imgUrl : string;

    constructor(private imgCropper : InstanceCropService){}

    private cancel(){
        this.imgUrl = undefined;
    }

    private callCropper(){
        setTimeout(() => {
            this.imgCropper.wakeUp();
            this.imgCropper.send(this.imgUrl)
        }, 500);
    }

    private fileEvent(fileInput: any){
        let file = fileInput.target.files[0];
        let url =  window.URL.createObjectURL(file);
        this.imgUrl = url;
    }

    private apply(){
        this.imgCropper.crop();
    }

    private save(url : string){
        this.imgUrl = url;
        window.open(this.imgUrl);
    }

}
