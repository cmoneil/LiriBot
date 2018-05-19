# LiriBot
This is a node.js project that uses the Spotify, Twitter, and Request( for OMDB) NPMs to return varying results. There is a different command for each NPM. 
*  'my-tweets` will return the last 20 tweets

* `spotify-this-song` "Song Name" Will return data for the song or will default to 'The Sign' if left blank.

* `movie-this` "Movie Name" Will return data for the movie or will default to "Mr Nobody" if left blank.

* `do-what-it-says` Reads a command from random.txt and executes that command.

All of the commands will log the requested command and the results to log.txt using fs.
