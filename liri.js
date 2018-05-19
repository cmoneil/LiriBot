require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var dataArr;
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

function appendToLog() {
    value ? '' : value = '';
    fs.appendFile("log.txt", "\n"+",Command: " + action + ", " + value + "\n", function (err) {
        if (err) {
            console.log(err);
        }
        else return;

    });
}
var twitName = { screen_name: 'rockchalk_02' };
function myTweets() {
    appendToLog();
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (error) throw error;

        var i;
        for (i = 0; i < 20; i++) {
            var tweetDate = tweets[i].created_at;
            var tweet = tweets[i].text;
            var content = `
            ----------------------------
            Tweet #${i} created at ${tweetDate}
            You tweeted: ${tweet}
            ----------------------------
            `;
            console.log(content);
            fs.appendFile("log.txt", content, function (err) {
                if (err) {
                    console.log(err);
                }
                else return;
            })
        };
    });


}

function spotifySong() {
    appendToLog();
    value ? '' : value = 'The Sign, Ace of Base';
    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].album.artists[0].name;
        var link = data.tracks.items[0].album.artists[0].href;
        var album = data.tracks.items[0].album.name;
        var content =`
        --------------------
        The artist name is: ${artist} 
        The song name is: ${value}
        Preview link: ${link}
        Album name: ${album}
        ---------------------`;
        console.log(content);
    
        fs.appendFile("log.txt", content, function (err) {
            if (err) {
                console.log(err);
            }
            else return;
        })
    })
    

}


function movie() {
    value ? '' : value = 'Mr. Nobody';
    request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=trilogy', function (error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            var title = JSON.parse(body).Title;
            var year = JSON.parse(body).Year;
            var imdb = JSON.parse(body).imdbRating;
            var rot = JSON.parse(body).Ratings[1] ? JSON.parse(body).Ratings[1].Value: " N/A";
            var country = JSON.parse(body).Country;
            var lang = JSON.parse(body).Language;
            var plot = JSON.parse(body).Plot;
            var actors = JSON.parse(body).Actors;
            var content =  ` 
            --------------------------
            The movie is: ${title}
            The movie came out in: ${year}
            The movie's IMDB rating is: ${imdb}
            The movie's Rotten Tomatoes rating is:${rot}
            The movie was produced in: ${country}
            The movie's language is: ${lang}
            The movie's plot is : ${plot}
            The movie's actors are: ${actors}
            --------------------------`;

            fs.appendFile("log.txt", content, function (err) {
                if (err) {
                    console.log(err);
                }
                else return;
            })
            
            console.log(content);
        }

    })
    appendToLog();

}

function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            dataArr = data.split(",");
            action = dataArr[0];
            value = dataArr[1];

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



        }
        appendToLog();

    })


}
