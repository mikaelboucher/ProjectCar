import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

const IMG_COUNT_LIMIT = 10;
const VALID_EXTENSION = ['png', 'jpeg', 'gif', 'bmp'];

@Component({
    selector: "img-selector",
    templateUrl: './app/html/object/imgselector.html',
    styleUrls : ['./app/css/object/imgselector.css']
})

export class ImgSelectorComponent{
    private images = new Array<string>(IMG_COUNT_LIMIT);
    private count = 0;
    private indexChange : number;

    constructor(private _sanitizer: DomSanitizer) {}

    @HostListener('dragover', ['$event']) public onDragOver(evt : any){
        evt.preventDefault();
        evt.stopPropagation();
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt : any){
        evt.preventDefault();
        evt.stopPropagation();
    }

    @HostListener('drop', ['$event']) public onDrop(event : any){
        event.preventDefault();
        event.stopPropagation();
        let file = event.dataTransfer.files[0];
        if(file){
            let ext = file.name.split('.')[file.name.split('.').length - 1];
            if(VALID_EXTENSION.lastIndexOf(ext) != -1){
                let url =  window.URL.createObjectURL(file);
                if (this.count < IMG_COUNT_LIMIT){
                    this.images[this.count] = url;
                    this.count++;
                }else{
                    console.log("trop d'image");
                }
            }else{
                console.log('mauvais type')
            }
        }
    }

    private begin(index : number){
        this.indexChange = index;
    }

    private fileEvent(fileInput: any){
        let file = fileInput.target.files[0];
        let url =  window.URL.createObjectURL(file);
        if (this.indexChange || this.indexChange === 0){
            let before = this.images[this.indexChange];
            this.images[this.indexChange] = url;
            this.indexChange = undefined;
            this.count += (before ? 0 : 1);
            console.log(this.count);
        }
        fileInput.target.value = null;
    }

    private getSafeImg(index : number){
        return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${this.images[index]})`);
    }

}
