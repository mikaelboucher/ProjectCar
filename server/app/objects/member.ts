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

    addTwitterAccount(twitterAccountNumber : string){

        // Verifier A faire losrque merge avec dev

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

}