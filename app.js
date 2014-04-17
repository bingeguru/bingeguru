
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var getData = require('./routes/getData');
var http = require('http');
var path = require('path');
var trakt = require('node-trakt');
var password = require('./Fixtures/password');
var showlist = require('./Fixtures/showList');
var fetchAPI = require('./fetchAPI');
var tvSchema = require('./Fixtures/TVSchema');
var db = require('mongoose');
var TVShows = db.model('tvshow');




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

//ROUTES - TODO: orderby ratings once db populated
app.get('/', routes.index);

app.get('/getShows', function(req,res){
  TVShows.find({$query: {}, $orderby: {ratings : -1} }, function(err, data){
    res.send(data);
  });
});

app.get('/getAShow', function(req,res){
  TVShows.findOne({title: req.query.title }, function(err, data){
    res.send(data);
  });
});
app.get('/getSearchedShow', function(req,res){
  TVShows.findOne({name: req.query.name }, function(err, data){
    res.send(data);
  });
});

app.get('/getFiltered', function(req,res){
  console.log("FFFING REQUEST", req.query.genres, req.query.min, req.query.max);
  if(req.query.genres === 'All'){
    TVShows.where('runtime').gt(req.query.min).lt(req.query.max).find({}, function(err, data){
      console.log(data);
      res.send(data);

    });

  }else{
    TVShows.where('genres').in([req.query.genres]).where('runtime').gt(req.query.min).lt(req.query.max).find().exec(function(err, data){
      console.log(data);
      res.send(data);


    });
  }

});

app.get('/slider', function(req, res){
  TVShows.find().limit(10).exec(function(err, data){
    res.send(data);
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
