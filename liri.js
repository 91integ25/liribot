var keys = require('./keys');
// var inquirer = require('inquirer');
var command = process.argv[2];
var toSearch = process.argv[3];
var spotify = require('spotify');
var Twitter = require('twitter');
var rp = require('request-promise');
var fs = require('fs');
var client = new Twitter({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token,
	access_token_secret: keys.access_secret
});

switch(command){
	case "spotify-this-song":
	spotifyIt();
	break;
	case "my-tweets":
	getTweets();
	break;
	case "movie-this":
	movie();
	break;
	case "do-what-it-says":
	doThis();
	break;
}
// function to get my tweets
function getTweets(){
var params = {
	screen_name: "91integ25"
}

client.get('statuses/user_timeline',params, function(error,tweets,response){
	for(var i = 0; i < tweets.length;i++){
		console.log("Created at: " + tweets[i].created_at);
		console.log("My tweet: " + tweets[i].text);
	}
});
}
// fucntion to search for spotify song
function spotifyIt(search){
	// assign url variable to distinguish between undefined and a regular search
	var url = "https://api.spotify.com/v1/search?q=" + toSearch +"&type=track&limit=1"
	if(toSearch === undefined){
		 url = "https://api.spotify.com/v1/search?q=the sign&type=track&limit=4" ;
	}
rp(url)
.then(function(body){
// parsing the json 
	var parsedBody = JSON.parse(body);
	if(toSearch === undefined){
		var ace = parsedBody.tracks.items[2];

		console.log("Artist name: " + ace.artists[0].name);
		console.log("Song name: " +  ace.name);
	    console.log("Preview url: " + ace.preview_url);
	    console.log("album name: " + ace.album.name);
	    // returning so that the rest of code does not run if ace of base 
	    return;
	}
	parsedBody.tracks.items.map(function(e){
		 
		console.log("Artist name: " + e.artists[0].name);
		console.log("Song name: " + e.name);
		console.log("Preview url: " + e.preview_url);
		console.log("album name: " + e.album.name);
	});
})
.catch(function(error){
	console.log(error);
});
}
// function for movie search 
function movie(){
	// checks if process.argv is defined
	if(toSearch === undefined){
		toSearch = "Mr.nobody";
	}
	// calling omdb api for data
rp("http://www.omdbapi.com/?t="+ toSearch + "&y=&plot=short&r=json")
.then(function(body){
	// parsing the json 
	var parsedJson =JSON.parse(body);

console.log("Title of movie: " + parsedJson.Title);
console.log("Year: " + parsedJson.Year);
console.log("Rating: " + parsedJson.Rated);
console.log("Country: " + parsedJson.Country);
console.log("Language: " + parsedJson.Language);
console.log("Plot: " + parsedJson.Plot);
console.log("Actors: " + parsedJson.Actors);
console.log("Rotten Tomatoes: " + parsedJson.Ratings[1].Value)

})
.catch(function (error){
	console.log(error);
});
}
// function to read text file and do what it says
function doThis(){
	fs.readFile("random.txt", "utf8", function(err,data){
		var dataArr = data.split(",");
		command = dataArr[0];
		toSearch = dataArr[1];
		// I'm not sure why this works but i'll leave it like this for now
		spotifyIt(toSearch);
	});
}

