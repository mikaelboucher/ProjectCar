import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
    selector: "principal-component",
    templateUrl: './app/html/principal.html',
    styleUrls : ['./app/css/principal.css'],
    providers : [ SocketService ]
})
export class PrincipalComponent { 
    constructor(private socketService : SocketService){
       console.log("test");
       this.socketService.tweet();
       this.socketService.connect();
   }

}
