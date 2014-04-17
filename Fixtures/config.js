var mongoose = require('mongoose');
var password = require('./password');

var mongoURI = password.uri;
mongoose.connect(mongoURI);
// trying on local
// mongoose.connect('mongodb://localhost/bingeguruShows');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('HOORAY!!!! WE ARE CONNECTED');
});


module.exports = db;

