export class Tweet {

    constructor(private tweetId: string, private twitterPicture: string, private twitterName: string, 
        private twitterHashtag: string, private tweetTime: string, private tweetText: string, 
        private tweetMediaUrl: string) {
    }

    getTweetId() {
        return this.tweetId;
    }

    getTwitterPicture(){
        return this.twitterPicture;
    }

    getTwitterName(){
        return this.twitterName;
    }

    getTwitterHashtag(){
        return this.twitterHashtag;
    }

    getTweetTime(){
        return this.tweetTime;
    }

    getTweetText(){
        return this.tweetText;
    }

    hasMedia(){
        let hasMedia = (this.tweetMediaUrl !== undefined);
        return hasMedia;
    }

}