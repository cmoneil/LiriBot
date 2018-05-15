require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var omdb = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];



switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doIt();
        break;
}
var twitName = { screen_name: 'rockchalk_02' };
function myTweets() {
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (error) throw error;

        var i;
        for (i = 0; i < 20; i++) {
            console.log('');
            console.log('Tweet #' + i + ' created at: ' + tweets[i].created_at);
            console.log('You said: ' + tweets[i].text);
        }
    });


}

function spotifySong() {
    value?'': value ='The Sign, Ace of Base';
    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log('The artist name is: ' + data.tracks.items[0].album.artists[0].name);
        console.log('The song name is: ' + value);
        console.log('Preview link: ' + data.tracks.items[0].album.artists[0].href );
        console.log('Album name: ' + data.tracks.items[0].album.name);
    })
}
