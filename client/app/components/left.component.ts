import { Component } from '@angular/core';
import { Tweet } from '../objects/tweet'

@Component({
    selector: "left-component",
    templateUrl: './app/html/left/leftprimary.html'
})
export class LeftComponent { 
    private tweets:Tweet[] = [];
    constructor(){
        let tweetId = '57016932'; 
        let twitterPicture = 'http://pbs.twimg.com/profile_images/1598460305/pcna_logo_normal.jpg'; 
        let twitterName = 'Porsche'; 
        let twitterHashtag = '@Porsche';
        let tweetTime = 'Fri Jun 02 20:15:51 +0000 2017'; 
        let tweetText = '@sumirpatelmd We\'re glad that you had a wonderful time! Thank you for visiting @PECATL. Have a great weekend! -MB'; 
        let tweetMediaUrl = 'http://www.larevueautomobile.com/images/Bugatti/Veyron-Centenaire/Exterieur/Bugatti_Veyron_Centenaire_002.jpg';

        let tweet = new Tweet (tweetId, twitterPicture, twitterName, twitterHashtag, tweetTime, tweetText, tweetMediaUrl);
        this.tweets.push(tweet);
    }
}
