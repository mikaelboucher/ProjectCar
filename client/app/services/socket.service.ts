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

    launchTweetListener(){
        console.log("Tweet listener is ON");
        socket.on("tweet", function(tweet : any) { 
            console.log("Tweets received : " + tweet);
        });
        socket.on("streamTweet", function(tweet : string) { 
            console.log("Stream tweet received : " + tweet);
        });
    }

    launchAllListeners(){
        this.launchTweetListener();
    }

    requireTweets(){
        socket.emit("requireTweets");
    }
}
