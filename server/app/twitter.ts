var twitter = require('twitter');
var io = require('socket.io')(3002);

let twitterCredentials = {  //mis dans array pour protéger l'information
  CONSUMER_KEY: 'Crv6rRnk5EQwEYJSn7buA84nD',
  CONSUMER_SECRET: 'aveALJ930HcfO3LkPlG0S0hhFzkZS8a9QGB59D8UsIKYg0bEyC',
  ACCESS_TOKEN_KEY: '4871930175-0RkxMEMfHeDmlbd2o3RJGiW6QXwAbRPhDzZm2Us',
  ACCESS_TOKEN_SECRET: '62Iv0knOYp3jMBlZVR4Y8T6gIfhZsyQMvrnjH4qBXEP9W'
};
 
var client = new twitter({
  consumer_key: twitterCredentials.CONSUMER_KEY,
  consumer_secret: twitterCredentials.CONSUMER_SECRET,
  access_token_key: twitterCredentials.ACCESS_TOKEN_KEY,
  access_token_secret: twitterCredentials.ACCESS_TOKEN_SECRET
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error : string, tweets : string, response : string) {
  if (!error) {
    console.log(tweets);
  }
});