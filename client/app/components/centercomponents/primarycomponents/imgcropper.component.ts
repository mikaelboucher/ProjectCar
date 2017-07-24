import { Component, HostListener } from '@angular/core';

const RATIO = 4/3;
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 300;

@Component({
    selector: "img-cropper",
    templateUrl: './app/html/center/imgcropper.html',
    styleUrls : ['./app/css/center/imgcropper.css']
})

export class ImgCropperComponent{
    private min = 50;
    private max = 200;
    private x: number;
    private y : number;
    private dragData : {x : number, y : number}[];
    private width : number;
    private height : number;
    private dragMode : boolean;
    private defaultURL = "../../../../assets/test.png";
    private factor : number;

    constructor(){
        this.x = this.y = 0;
        this.factor = ((this.max - this.min)/2 + this.min);
        this.width = DEFAULT_WIDTH * this.factor/100;
        this.height = DEFAULT_HEIGHT * this.factor/100;
        this.dragData = [];
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
            console.log('finish');
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
            console.log(this.x);
            if (!this.area(document.getElementById('bound').getBoundingClientRect())){
                this.x -= dx;
                this.y -= dy;
            }
        }
    }

    private change(factor : number){
        let oldWidth = this.width;
        let oldHeight = this.height;
        let oldFactor = this.factor;
        this.factor = factor;
        this.width = DEFAULT_WIDTH * this.factor/100;
        this.height = DEFAULT_HEIGHT * this.factor/100;
        if (!this.area(document.getElementById('bound').getBoundingClientRect())){
            this.width = oldWidth;
            this.height = oldHeight;
            this.factor = oldFactor;
        }
    }

    private area(bound : ClientRect) : boolean{
        return (this.x >= 0 && this.x + this.width <= bound.width)
            && (this.y >= 0 && this.y + this.height <= bound.height)
    }

}