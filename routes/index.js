
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BingeGuru' });
};

exports.getData = function(req, res){
  db.tvshows.find({}, function(err, data){
    res.send(data);
  });
};
