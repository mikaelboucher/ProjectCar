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
    private x: number;
    private y : number;
    private dragData : {x : number, y : number}[];
    private width : number;
    private height : number;
    private dragMode : boolean;

    constructor(){
        this.x = this.y = 50;
        this.width = DEFAULT_WIDTH;
        this.height = DEFAULT_HEIGHT;
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

    private area(bound : ClientRect) : boolean{
        return (this.x >= 0 && this.x + this.width <= bound.width)
            && (this.y >= 0 && this.y + this.height <= bound.height)
    }

}