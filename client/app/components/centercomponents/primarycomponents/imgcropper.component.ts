import { Component, HostListener, AfterViewInit } from '@angular/core';

import { CropService } from '../../../services/image/crop.service';

const RATIO = 4/3;
const MIN = 50;
const MAX = 100;
const DEFAULT_VALUE = 75;
const LIMIT_LOOP = 10;
const DEFAULT_URL = "../../../../assets/test.png";

@Component({
    selector: "img-cropper",
    templateUrl: './app/html/center/imgcropper.html',
    styleUrls : ['./app/css/center/imgcropper.css'],
    providers : [ CropService ]
})

export class ImgCropperComponent implements AfterViewInit{
    private min = MIN;
    private max = MAX;
    private x = 0;
    private y = 0;
    private highestWidth : number;
    private highestHeight : number;
    private dragData : {x : number, y : number}[];
    private width = 0;
    private height = 0;
    private dragMode : boolean;
    private factor = DEFAULT_VALUE;
    private imagePreviewUrl = DEFAULT_URL;
    private cropColor = "#FFFFFF";

    constructor(private cropService : CropService){
        this.dragData = [];
    }

    ngAfterViewInit(){
        this.newCropperDimension();
        //timeout MANDATORY, otherwise cannot change DOM attribut
        setTimeout( () => this.changeCropperView(), 10);
    }

    @HostListener('document:mousedown', ['$event'])
    onMouseEnter(event : MouseEvent) {
        if (event.toElement.id === "cropper"){
            this.dragMode = true;
            this.dragData.push({ x : event.clientX, y : event.clientY });
        }
    }
    
    @HostListener('document:mouseup')
    onmouseleave(event : any) {
        if (this.dragMode){
            this.dragMode = false;
            this.dragData = [];
        }
    }

    @HostListener('document:mousemove', ['$event'])
    onmousemouve(event : MouseEvent) {
        if (this.dragMode){
            this.dragData.push({ x : event.clientX, y : event.clientY });
            let dx = this.dragData[this.dragData.length - 1].x - this.dragData[this.dragData.length - 2].x;
            let dy = this.dragData[this.dragData.length - 1].y - this.dragData[this.dragData.length - 2].y;
            this.dragData.shift();
            this.x += dx;
            this.y += dy;
            if (!this.area(document.getElementById('bound').getBoundingClientRect())){
                this.x -= dx;
                this.y -= dy;
            }
        }
    }

    private generateColorCrop(){
        let canvas = document.createElement('canvas');
        let img = new Image();
        img.onload = () => {
            let data = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
            this.iterateColor(data);
        }
        img.src = this.imagePreviewUrl;
    }

    private iterateColor(data : ImageData){
        let averageRGB : {r : number, g : number, b : number}[] = [];
        const MAX_RESULT = 8;
        let pixels = data.data;
        let iterateX = data.width/MAX_RESULT;
        let iterateY = data.height/MAX_RESULT;
        for (let i =0; i < data.width; i += iterateX){
            for(let j =0; j < data.height; j += iterateY){
                let index = (j * data.width + i) * 4;
                let rgb = {
                    r : 0,
                    g : 0,
                    b : 0
                }

                rgb.r = pixels[index];
                rgb.g = pixels[index + 1];
                rgb.b = pixels[index + 2];
            }
        }
        let result = {
            r : 0,
            g : 0,
            b : 0
        };
        averageRGB.forEach(rgb => {
            result.r += rgb.r;
            result.g += rgb.g;
            result.b += rgb.b;
        })
        result.r = result.r/averageRGB.length;
        result.g = result.g/averageRGB.length;
        result.b = result.b/averageRGB.length;
        this.convertToHex(result);
    }

    private convertToHex(result : {r : number, g : number, b : number}){
        let hex = "#";
        let num = result.r.toString();
        hex += parseInt(num, 16) ^ 1;
        num = result.g.toString();
        hex += parseInt(num, 16) ^ 1;
        num = result.b.toString();
        hex += parseInt(num, 16) ^ 1;
        this.cropColor = hex;
    }

    private newCropperDimension(){
        this.highestWidth = document.getElementById('bound').getBoundingClientRect().width;
        let newHeight = this.highestWidth/RATIO;
        while(document.getElementById('bound').getBoundingClientRect().height < newHeight){
            this.highestWidth -= 50;
            newHeight = this.highestWidth/RATIO;
        }
        this.highestHeight = newHeight;
        this.cropService.changeBound(document);
    }

    private changeCropperView(){
        this.x = this.y = 0;
        this.factor = DEFAULT_VALUE;
        this.width = this.highestWidth * this.factor/100;
        this.height = this.highestHeight * this.factor/100;
    }

    private change(factor : number){
        let speed = factor - this.factor;
        this.factor = factor;
        this.width = this.highestWidth * this.factor/100;
        this.height = this.highestHeight * this.factor/100;
        if (speed > 0){
            let cycle = 0;
            while (!this.area(document.getElementById('bound').getBoundingClientRect())){
                let norme = Math.sqrt((this.x + this.x) + (this.y + this.y));
                let reverseX = this.x / norme;
                let reverseY = this.y / norme;
                this.x -= reverseX;
                this.y -= reverseY;
                cycle++;
                if (cycle > LIMIT_LOOP){
                    this.x = 0;
                    this.y = 0;
                    break;
                }
            }
        }
    }
    private area(bound : ClientRect) : boolean{
        return (this.x >= 0 && this.x + this.width <= bound.width)
            && (this.y >= 0 && this.y + this.height <= bound.height)
    }

    private fileEvent(fileInput: any){
        let file = fileInput.target.files[0];
        this.imagePreviewUrl =  window.URL.createObjectURL(file);
        this.cropService.changeImage(this.imagePreviewUrl);
        this.generateColorCrop();
    }

    private crop(){
        let propreties = {
            x : this.x,
            y : this.y,
            width : this.width,
            height : this.height
        }
        this.cropService.start(propreties, document);
    }

    private onResize(){
        this.newCropperDimension();
        this.changeCropperView();
    }
}
