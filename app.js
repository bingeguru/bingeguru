
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
var fetchAPI = require('./fetchAPI');
var tvSchema = require('./Fixtures/TVSchema');



// Connect to the db


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

  // trakt.init(password.api);
  // trakt.login(password.username, password.password , function(){
  //   console.log("HERE");
  //   db.tvshows.find({}, function (err, shows) {
  //     shows.forEach(function(show){
  //       trakt.showSummary({title: show.title}, function(err, data){
  //         console.log(data);
  //       });
  //     });
  //   });

  // });



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
