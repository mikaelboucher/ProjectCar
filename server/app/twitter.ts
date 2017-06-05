let twitter = require('twitter');

const PORSHE_TWITTER_ID = '57016932';
const KEVIN_TWITTER_ID = '172915358';

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

export function routes(io : any){

  /* Obtenir le user_timeline lors de la premiere connection */
  /* Possible d'ajouter des user_id et screen_name en les séparant par virgules */ 
  /* dans des arrays pour acceder a d'autres comptes */

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

  let stream = client.stream('statuses/filter', {follow: KEVIN_TWITTER_ID}); 
  
  stream.on('data', function(event : any) {   // surement string... modifier plus tard
    console.log(event.extended_entities.media);
  });
  
  stream.on('error', function(error : any) { // surement string... modifier plus tard
    throw error;
  });

  // gérer les erreurs 420 (nombre maximum de requetes à twitter atteint)}
}
