import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { OptionService } from './optionservice';

let socket = io('http://localhost:3002');

@Injectable()
export class SocketService{

    constructor(public optionService: OptionService){
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
        socket.on("displayClassified", (classfiedId : any ) => {
           console.log("TOPKEK");
           this.optionService.currentOption = "news";
        });
    }

    launchAllListeners(){
        this.launchTweetListener();
    }

    requireTweets(){
        socket.emit("requireTweets");
    }
}
