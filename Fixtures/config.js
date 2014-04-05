var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/bingeguru';

mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('HOORAY!!!! WE ARE CONNECTED');
});

mongoose.connect('mongodb://localhost/bingeguru');

module.exports = db;

