/* 
    Classe Member utile sous peu pour stocker infos specifiques 
    à un membre (nom, id, comptes twitters suivis...)
    */

export class Member {

    private firstName : string;
    private lastName : string;
    private followedTwitterAccounts: string[];
    private trackedTwitterHashtags: string[];

    constructor (firstName : string, lastName : string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.followedTwitterAccounts = [];
        this.trackedTwitterHashtags = [];
    }

    getFirstName(){
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getTwitterAccounts(){
        return this.followedTwitterAccounts;
    }

    getHashtags(){
        return this.trackedTwitterHashtags;
    }

    addTwitterAccount(twitterAccountNumber : string){
        let accountAlreadyAdded = (this.followedTwitterAccounts.indexOf(twitterAccountNumber) !== -1);
        if (!accountAlreadyAdded){
            this.followedTwitterAccounts.push(twitterAccountNumber);
        }
    }

    addTwitterHashtag(hashtag : string){
        let hashtagAlreadyAdded = (this.trackedTwitterHashtags.indexOf(hashtag) !== -1);
        if (!hashtagAlreadyAdded){
            this.trackedTwitterHashtags.push(hashtag);
        }
    }

    removeTwitterAccount(twitterAccountNumber : string){
        let index = this.followedTwitterAccounts.indexOf(twitterAccountNumber);
        if (index !== -1)
            this.followedTwitterAccounts.splice(index,1);
    }

    removeTwitterHashtag(hashtag : string){
        let index = this.trackedTwitterHashtags.indexOf(hashtag);
        if (index !== -1)
            this.trackedTwitterHashtags.splice(index,1);
    }
}
