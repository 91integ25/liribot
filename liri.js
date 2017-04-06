var keys = require('./keys');
// var inquirer = require('inquirer');
var command = process.argv[2];
var toSearch = process.argv[3];
var spotify = require('spotify');
var Twitter = require('twitter');
var rp = require('request-promise');
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
}

function getTweets(){
var params = {
	screen_name: "91integ25"
}

client.get('statuses/user_timeline',params, function(error,tweets,response){
	for(var i = 0; i < tweets.length;i++){
		console.log("created at: " + tweets[i].created_at);
		console.log("my tweet: " + tweets[i].text);
	}
});
}


function spotifyIt(){
	var params ={
		type:"track",
		limit:2,
		query:toSearch
		
	}

spotify.search(params,function(err,data){
	if(err){
		console.log("error occurred: " + err)
		return;
	}
data.tracks.items.map(function(e){
console.log(e.preview_url);
});
});
}
function movie(){
rp("http://www.omdbapi.com/?t="+ toSearch + "&y=&plot=short&r=json")
.then(function(body){
	var parsedJson =JSON.parse(body) 
console.log("Title of movie: " + parsedJson.Title);
console.log("Year: " + parsedJson.Year);
console.log("Rating: " + parsedJson.Rated);
console.log("Country: " + parsedJson.Country);
console.log("Language: " + parsedJson.Language);
console.log("Plot: " + parsedJson.Plot);
console.log("Actors: " + parsedJson.Actors);
console.log("Rotten Tomatoes: " + parsedJson.Ratings.value)

})
.catch(function (error){
	console.log(error);
});
}
movie();
