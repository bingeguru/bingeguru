var mongoose = require('mongoose');

var TVSchema = new mongoose.Schema({
  name: String,
  title: String,
  runtime: Number,
  seasons: [],
  poster: String,
  totalTime: Number,
  genres: []
});

// TVSchema.instance.processData = function(data){
//  //tkaes each instance from the database
//  //makes api call
//  //saves to db
// };

module.exports = mongoose.model('tvshow', TVSchema);

// trakt.showSeasons({title : showList[i].title},function(err, data){
//         if(err){
//           throw err;
//         }
//         var show = {seasons:{}};
//         for(var j = 0; j < data.length; j++){
//           var showName = data[j].url;
//           showName = showName.split('/');
//           show['title'] = showName[4];
//           show.seasons[data[j].season+1] = data[j].episodes;
//         }
//         collection.insert(show, {w:1}, function(err,result) {
//           console.log(result);
//         });
//       });