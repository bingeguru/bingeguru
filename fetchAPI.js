var password = require('./Fixtures/password');
var showlist = require('./Fixtures/showList');
var tvSchema = require('./Fixtures/TVSchema');
var trakt = require('node-trakt');
var _ = require('underscore');

//TRAKT API CONNECTION

// var newShow = new tvSchema({
//   name:
// });

// newShow.save(function(err, show){

// })


var fetchAPI = function(){
  trakt.init(password.api);
  trakt.login(password.username, password.password , function(){
    console.log("HERE");
    tvSchema.find({}, function (err, shows) {
      shows.forEach(function(show){
        trakt.showSeasons({title: 'the-wire'}, function(err, data){
          _.each(data, function(obj){
          show.seasons.push([obj.season, obj.episodes]);
          });
          show.save(function(err,result){
            if (err) return console.error(err);
          });
        });
      });
    });

  });
};

fetchAPI();

module.exports = fetchAPI;

