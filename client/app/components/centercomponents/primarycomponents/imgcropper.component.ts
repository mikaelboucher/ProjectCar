import { Component, HostListener, AfterViewInit } from '@angular/core';

import { CropService } from '../../../services/image/crop.service';

import { Extra } from '../../../utils/extra'

const RATIO = 4/3;
const MIN = 50;
const MAX = 100;
const DEFAULT_VALUE = 75;
const LIMIT_LOOP = 10;
const DEFAULT_URL = "";

@Component({
    selector: "img-cropper",
    templateUrl: './app/html/center/imgcropper.html',
    styleUrls : ['./app/css/center/imgcropper.css'],
    providers : [ CropService ]
})

export class ImgCropperComponent implements AfterViewInit{
    private min = MIN;
    private max = MAX;
    private highestWidth : number;
    private highestHeight : number;
    private x = 0;
    private y = 0;
    private width = 0;
    private height = 0;
    private offsetX = 0;
    private offsetY = 0;
    private imgPreviewSizeX = 1;
    private imagePreviewSizeY = 1;
    private dragData : {x : number, y : number}[];
    private dragMode : boolean;
    private factor = DEFAULT_VALUE;
    private imagePreviewUrl = DEFAULT_URL;

    constructor(private cropService : CropService){
        this.dragData = [];
    }

    private getStyle(){
        let imgX = -1 * (this.x - this.offsetX);
        let imgY = -1 * (this.y - this.offsetY);
        return {
            'background-image' : 'url(' + this.imagePreviewUrl + ')',
            'background-size' : (this.imgPreviewSizeX)+ 'px ' + (this.imagePreviewSizeY) + 'px',
            'background-repeat' : 'no-repeat' ,
            'background-position' : imgX + 'px ' + imgY + 'px '
        }
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
        this.cropService.changeImage(this.imagePreviewUrl, (imgSize : any, offset : any) => {
            this.imgPreviewSizeX = imgSize.width;
            this.imagePreviewSizeY = imgSize.height;
            this.offsetX = offset.x;
            this.offsetY = offset.y;
        });
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
