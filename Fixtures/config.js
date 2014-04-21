var mongoose = require('mongoose');

if(!process.env.URI){
  var password = require('./password');
}

var mongoURI = process.env.URI || password.uri;
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('HOORAY!!!! WE ARE CONNECTED');
});


module.exports = db;

