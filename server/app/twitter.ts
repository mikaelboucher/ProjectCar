let twitter = require('twitter');
let fs = require('fs');

const PORSHE_TWITTER_ID = '57016932';
const KEVIN_TWITTER_ID = '172915358';
const MIKAEL_TWITTER_ID = '4871930175';
const TEST_HASHTAG = 'covfefe';

let twitterCredentials = {  //mis dans array pour protéger l'information
  CONSUMER_KEY: 'Crv6rRnk5EQwEYJSn7buA84nD',
  CONSUMER_SECRET: 'aveALJ930HcfO3LkPlG0S0hhFzkZS8a9QGB59D8UsIKYg0bEyC',
  ACCESS_TOKEN_KEY: '4871930175-0RkxMEMfHeDmlbd2o3RJGiW6QXwAbRPhDzZm2Us',
  ACCESS_TOKEN_SECRET: '62Iv0knOYp3jMBlZVR4Y8T6gIfhZsyQMvrnjH4qBXEP9W'
};
 
let client = new twitter({
  consumer_key: twitterCredentials.CONSUMER_KEY,
  consumer_secret: twitterCredentials.CONSUMER_SECRET,
  access_token_key: twitterCredentials.ACCESS_TOKEN_KEY,
  access_token_secret: twitterCredentials.ACCESS_TOKEN_SECRET
});

let followedTwittedAccounts : string[] = []; 
let trackedTwitterHashtags : string[] = [];

followedTwittedAccounts.push(MIKAEL_TWITTER_ID);  //temporaire... pour tests
trackedTwitterHashtags.push(TEST_HASHTAG);        //temporaire... pour tests

/* 
  Funtion : getTwitterID()
  Fonctionne mais ASYNCHRONE ... le return s'effectue avant que le get de l'API soit complet... 
  A AMELIORER 
*/

let stream : any;

export function getTwitterID(twitterAccountName : string) : string {
  let twitterUserId : string = "";
  client.get('users/show', {screen_name :twitterAccountName}, function(error : any, tweets : any, response : any) {
    let json = JSON.parse(response.body);
    if (!error) {
      twitterUserId = json.id;
      console.log("json.id = " + json.id);              //temporaire... pour tests
      console.log("twitterUserId = " + twitterUserId);  //temporaire... pour tests
    }
    else {
      twitterUserId = "-1";
      console.log("unable to retrieve twitter user id"); //temporaire... pour tests
    }
  });
  return twitterUserId;
}

export function addTwitterAccount(twitterAccountNumber : string){

  let accountAlreadyAdded = (followedTwittedAccounts.indexOf(twitterAccountNumber) !== -1);

  if (accountAlreadyAdded){
    return;
  }
  else{

    followedTwittedAccounts.push(twitterAccountNumber);
  }
}

export function addTwitterHashtag(hashtag : string){

  let hashtagAlreadyAdded = (trackedTwitterHashtags.indexOf(hashtag) !== -1);

  if (hashtagAlreadyAdded){
    return;
  }
  else{
    trackedTwitterHashtags.push(hashtag);
  }
}

export function getTenTweets(twitterAccountNumber : string){
  
  let twitterRequestParameters = {
    count : 10,
    user_id : twitterAccountNumber
  };

  client.get('statuses/user_timeline', twitterRequestParameters, function(error : any, tweets : any, response : any) {
    if (!error) {
        console.log(tweets.text);
    }
  });
}

//Stocker les payloads de twitters sur le seveur (choisir quoi stocker et comment)
//Socket.io coté serveur pour passer les tweets aux clients
//Gérer un paquet d'erreurs possibles (420, 500 ...)
//Être capable d'acceder a des fonctions du genre ajouter compte a suivre ou mot clé
//Être capable de trouver des user id twitter avec le screen_name (ex : screen_name Porsche = user_id). Surement GET users/show dans l'API.
    //TESTER CE QUI ARRIVE POUR COMPTE PROTÉGÉ... Gérer cela
//Être capable d'acceder l'API pour la liste des tweets passés d'un user ou mot clé qu'un client veut suivre (pas possible avec le stream de twitter)

/****************************************************************
Function : launchTwitterStream()
Purpose : 
  - Called when server is launched to
    1. Set up connection to twitter stream to have live updates 
    2. Get tweets from API
*****************************************************************/

export function launchTwitterStream(io : any){

  /* Obtenir le user_timeline lors de la premiere connection */
  /* Possible d'ajouter des user_id et screen_name en les séparant par virgules */ 
  /* dans des arrays pour acceder a d'autres comptes */
  /* Section qui s'occupe de streamer les posts de twitter user_id */
  /* Possible d'ajouter des user_id en les séparant par virgules */ 
  /* dans des arrays pour acceder a d'autres comptes */
  /* track : Keywords to track */
  /* follow : User_ID */
  console.log('Twitter stream launched');
  stream = client.stream('statuses/filter', {follow : MIKAEL_TWITTER_ID}); 
}

export function twitterStream(socket : any){
  stream.on('data', function(event : any) {   // surement string... modifier plus tard
    let tweet : string;
    tweet = (event && event.text);
    socket.emit("streamTweet", tweet)
  });
}
