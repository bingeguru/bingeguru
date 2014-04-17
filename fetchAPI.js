var trakt = require('node-trakt');
var password = require('./Fixtures/password');
var showlist = require('./Fixtures/showList');
var tvSchema = require('./Fixtures/TVSchema');
var db = require('mongoose');
var TVShows = db.model('tvshow');

// checking db entries
TVShows.find({title: 'the-newsroom'}, function(err, shows){
  shows.forEach(function(show){
  // 	show.episodes = [];
  // 	show.save(function(err, result){
  // 		if(err) console.log(err);
  	// });
    console.log(show.name, show.episodes);
  });
});

trakt.init(password.api);
trakt.login(password.username, password.password , function(){
  console.log("API call!");
  TVShows.find({}, function (err, shows) {
  	shows.forEach(function(show){

  		//populating related info
  		// trakt.showSummary({title: show.title}, function(err,data){
  		// 	show.year = data.year;
  		// 	show.overview = data.overview;
  		// 	show.runtime = data.runtime;
  		// 	show.network = data.network;
  		// 	show.poster = data.poster;
  		// 	show.ratings = (data.ratings) ? data.ratings.percentage : 0;
  		// 	show.votes = (data.ratings) ? data.ratings.votes : 0;
  		// 	show.genres = data.genres;
  		// 	show.people = (data.people) ? data.people.actors : "";
  		// 	show.save(function(err, result){
  		// 		if(err) console.log('error in saving to db', err);
  		// 	});
  		// });

  		// // populating season details
  		// trakt.showSeasons({title: show.title}, function(err, data){
  		// 	show.seasons_details = data;
  		// 	if(Array.isArray(data) && data.length > 0){	
  		// 		data.forEach(function(item){
	  	// 			show.seasons.push([item.season, item.episodes]);
	  	// 		});
  		// 	}
  		// 	show.save(function(err, result){
  		// 		if(err) console.log('error in saving to db', err);
	   //      });
	   //  });

    	// // populating episode details
    	show.seasons.forEach(function(season){
    		if(season.length > 0){
		        trakt.showSeason({title: show.title, season: season}, function(err, data){
		        	if(Array.isArray(data) && data.length > 0){
			        	data.forEach(function(episode){
			        		show.episodes.push({
			        			season: episode.season,
			        			episode: episode.episode,
			        			title: episode.title,
			        			overview: episode.overview});
			        	});
		        	}
		        	show.save(function(err, result){
		        		if(err) console.log('error in saving to db', err);
		        	});
		        });
    		}
	    });

    });
  });
});