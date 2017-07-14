import { Component, Input } from '@angular/core';
import { Tweet } from '../objects/tweet'

@Component({
    selector: "twitter-component",
    templateUrl: './app/html/left/twitter.html',
    styleUrls : ['./app/css/left/twitter.css']
    //providers :
})
export class TwitterComponent {
    @Input() tweets : Tweet[];
}   

//<a class="twitter-timeline" data-width="500" data-height="300" data-theme="dark" 
//href="https://twitter.com/TwitterDev/lists/national-parks">A Twitter List by TwitterDev</a> 
//<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
