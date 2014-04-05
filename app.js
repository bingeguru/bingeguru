
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var trakt = require('node-trakt');
var password = require('./Fixtures/password');
var showlist = require('./Fixtures/showList');
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//ROUTES
app.get('/', routes.index);

//TRAKT API CONNECTION
trakt.init(password.api);

//Array of all SHOWS
var shows = [];

//input list of shows
var showList = showlist.showList;

// GET DATA
trakt.login(password.username, password.password , function(){
  for(var i = 0; i<showList.length; i++){

      trakt.showSeasons({title : showList[i].title},function(err, data){
        if(err){
          throw err;
        }
        var show = {seasons:{}};
        for(var j = 0; j < data.length; j++){
          var showName = data[j].url;
          showName = showName.split('/');
          show['title'] = showName[4];
          show.seasons[data[j].season+1] = data[j].episodes;


        }
        console.log("show", show);
      });
        // console.log(showList[i],shows);

  }
 // console.log(shows);

}); // trakt login



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
