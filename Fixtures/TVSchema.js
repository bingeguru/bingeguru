var mongoose = require('mongoose');
var trakt = require('node-trakt');

var TVSchema = new mongoose.Schema({
  name: String,
  title: String,
  runtime: Number,
  totalTime: Number,
  poster: String,
  imdb_rating: Number,
  ratings: Number,
  votes: Number,
  year: Number,
  network: String,
  overview: String,
  genres: [],
  netflix: Boolean,
  hulu: Boolean,
  amazon: Boolean,
  itunes: Boolean,
  seasons:[],
  seasons_details: [{
  	season: Number,
  	episodes: Number,
    url: String,
    poster: String,
    images: {
      poster:String
    }
  }],
  episodes: [{
    season: Number,
    episode: Number,
    title: String,
    overview: String
  }],
  people: [{
  	name: String,
  	character: String,
  	images: String
  }]
});

module.exports = mongoose.model('tvshow', TVSchema);