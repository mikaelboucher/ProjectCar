let twitter = require('twitter');
let fs = require('fs');

const PORSHE_TWITTER_ID = '57016932';
const KEVIN_TWITTER_ID = '172915358';
const MIKAEL_TWITTER_ID = '4871930175';

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

const followedTwittedAccounts = {
  PORSHE_TWITTER_ID
}

let trackedTwitterKeywords = {
  
}

//Stocker les payloads de twitters sur le seveur (choisir quoi stocker et comment)
//Socket.io coté serveur pour passer les tweets aux clients
//Gérer un paquet d'erreurs possibles (420, 500 ...)
//Être capable d'acceder a des fonctions du genre ajouter compte a suivre ou mot clé
//Être capable de trouver des user id twitter avec le screen_name (ex : screen_name Porsche = user_id). Surement GET users/show dans l'API.
//Être capable d'acceder l'API pour la liste des tweets passés d'un user ou mot clé qu'un client veut suivre (pas possible avec le stream de twitter)
// AJOUTER FONCTION POUR VERIFIER SI NOUS SUIVONS DÉJA UN USAGER TWITTER /MOT CLÉ

/****************************************************************
Function : routes
Purpose : 
  - Called when server is launched to
    1. Set up connection to twitter stream to have live updates 
    2. Get tweets from API
*****************************************************************/

export function routes(io : any){

  /* Obtenir le user_timeline lors de la premiere connection */
  /* Possible d'ajouter des user_id et screen_name en les séparant par virgules */ 
  /* dans des arrays pour acceder a d'autres comptes */

  /* code pour API en commentaire pour l'instant car incomplet*/
  /*
  let parametresAppelTwitter = {user_id: PORSHE_TWITTER_ID};

  client.get('statuses/user_timeline', parametresAppelTwitter, function(error : string, tweets : string, response : string) {
  if (!error) {
      console.log(tweets);
  }
  });

  */

  /* Section qui s'occupe de streamer les posts de twitter user_id */
  /* Possible d'ajouter des user_id en les séparant par virgules */ 
  /* dans des arrays pour acceder a d'autres comptes */
  /* track : Keywords to track */
  /* follow : User_ID */

  let stream = client.stream('statuses/filter', {follow: MIKAEL_TWITTER_ID}); 
  
  stream.on('data', function(event : any) {   // surement string... modifier plus tard
    console.log(event.extended_entities.media);
  });
  
  stream.on('error', function(error : any) { // surement string... modifier plus tard
    throw error;
  });
}