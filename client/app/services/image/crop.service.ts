import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CropService {
    private realImgSize : {width : number, height : number, ratio : number};
    private bound : {width : number, height : number, ratio : number};
    private offset : {x : number, y : number};
    private imgSize : {width : number, height : number};
    private imageURL : string;

    constructor() {
        this.realImgSize = {width : 0, height : 0, ratio : 0};
        this.bound = {width : 0, height : 0, ratio : 0};
        this.offset = {x : 0, y : 0};
        this.imgSize = {width : 0, height : 0};
    }

    public get isReady() : boolean{
        return this.imageURL !== undefined;
    }

    public changeBound(document : any){
        this.bound.width = document.getElementById('bound').getBoundingClientRect().width;
        this.bound.height = document.getElementById('bound').getBoundingClientRect().height;
        this.bound.ratio = this.bound.width/this.bound.height;
    }

    public changeImage(url : string, fn? : Function){
        this.imageURL = url;
        let img = new Image()
        img.onload = () =>{
            this.realImgSize.width = img.width;
            this.realImgSize.height = img.height;
            this.realImgSize.ratio = img.width/img.height;
            let imgWidth, imgHeight;
            this.offset = { x : 0, y : 0 };
            if (this.realImgSize.ratio >= this.bound.ratio){
                imgWidth = this.bound.width;
                imgHeight = imgWidth/this.realImgSize.ratio;
                this.offset.y = (this.bound.height - imgHeight)/2;
                this.offset.y = this.offset.y <= 0 ? 0 : this.offset.y;
            }else{
                imgHeight = this.bound.height;
                imgWidth = imgHeight * this.realImgSize.ratio;
                this.offset.x = (this.bound.width - imgWidth)/2;
            }
            this.imgSize = {width : imgWidth, height : imgHeight}
            fn(this.imgSize, this.offset);
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
        let imgWidth, imgHeight;
        let offsetX = 0;
        let offsetY = 0;
        let scaleImgX = this.realImgSize.width / this.imgSize.width;
        let scaleImgY = this.realImgSize.height / this.imgSize.height;
        return  {
            x : (propreties.x - this.offset.x) * scaleImgX,
            y : (propreties.y - this.offset.y) * scaleImgY,
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
