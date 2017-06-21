import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';

let socket = io('http://localhost:3002');

@Injectable()
export class SocketService{

    constructor(){
        socket = io.connect('http://localhost:3002');
    }

    connect(){
        socket.emit('requestTweets');
    }

    tweet(){
        socket.on("tweet", function(tweet : any) { 
            console.log("Tweet listener is ON");
            console.log(tweet);
        });
    }
}
