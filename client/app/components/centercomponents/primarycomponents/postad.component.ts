import { Component } from '@angular/core';

@Component({
    selector: "post-ad",
    templateUrl: './app/html/center/postad.html',
    styleUrls : ['./app/css/center/postad.css']
})

export class PostAdComponent{
    private title : string;
    private price : number;
}