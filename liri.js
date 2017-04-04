var keys = require('./keys');
var inquirer = require('inquirer');
var spotify = require('spotify');
var Twitter = require('twitter');
var rp = require('request-promise');
var client = new Twitter({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token: keys.access_token,
	access_secret: keys.access_secret
});
console.log(keys.consumer_key)
var params = {
	screen_name: 'nodejs'
}

client.get('search/tweets',params, function(error,tweets,response){
	if(error){
		console.log(error)
	}
	else{
		console.log(tweets);
	}

});


// inquirer.prompt([
// 	{
// 		type: "list",
// 		message:"Hello I am Liri, What would you like me to do?",
// 		choices:["my-tweets","spotify-this-song","movie-this","do-what-it-says"],
// 		name:"startup"
// 	}
// 	]).then(function(user){
// 		// if(user.startup === ){
// 		// }

// });


