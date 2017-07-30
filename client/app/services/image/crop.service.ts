import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CropService {
    private imageSize : {width : number, height : number, ratio : number};
    private bound : {width : number, height : number, ratio : number};
    private imageURL : string;

    constructor() {
        this.imageSize = {width : 0, height : 0, ratio : 0};
        this.bound = {width : 0, height : 0, ratio : 0};
    }

    public get isReady() : boolean{
        return this.imageURL !== undefined;
    }

    public changeBound(document : any){
        this.bound.width = document.getElementById('bound').getBoundingClientRect().width;
        this.bound.height = document.getElementById('bound').getBoundingClientRect().height;
        this.bound.ratio = this.bound.width/this.bound.height;
    }

    public changeImage(url : string){
        this.imageURL = url;
        let img = new Image()
        img.onload = () =>{
            this.imageSize.width = img.width;
            this.imageSize.height = img.height;
            this.imageSize.ratio = img.width/img.height;
        }
        img.src = url;
    }

    public start(propreties : {x : number, y : number, width : number, height : number}, document : any){
        let config = this.generateConfig(propreties);
        this.crop(config, document, (data : any) => {
            window.open(data);
        })
    }

    private generateConfig(propreties : {x : number, y : number, width : number, height : number}){
        let imgWidth;
        let imgHeight;
        let offsetX = 0;
        let offsetY = 0;
        if (this.imageSize.ratio >= this.bound.ratio){
            imgWidth = this.bound.width;
            imgHeight = imgWidth/this.imageSize.ratio;
            offsetY = (this.bound.height - imgHeight)/2;
            offsetY = offsetY <= 0 ? 0 : offsetY;
        }else{
            imgHeight = this.bound.height;
            imgWidth = imgHeight * this.imageSize.ratio;
            offsetX = (this.bound.width - imgWidth)/2;
        }
        let scaleImgX = this.imageSize.width / imgWidth;
        let scaleImgY = this.imageSize.height / imgHeight;
        return  {
            x : (propreties.x - offsetX) * scaleImgX,
            y : (propreties.y - offsetY) * scaleImgY,
            width : propreties.width * scaleImgX,
            height : propreties.height * scaleImgY,
        };
    }

    private crop(config : {x : number, y : number, width : number, height : number}, document : any, fn : Function){
        let canvas = document.createElement('canvas');
        let img = new Image();
        canvas.width = config.width;
        canvas.height = config.height;
        img.onload = () => {
            canvas.getContext('2d').drawImage(img, config.x, config.y,
            config.width, config.height, 0, 0, config.width, config.height);
            fn(canvas.toDataURL("image/png"));
        }
        img.src = this.imageURL;
    }
    
}
