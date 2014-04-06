var testData = angular.module('testData', [
  ]);

testData.factory('testDataFactory', function(){

  var data = {
    'shows':[
    {
      'title':'Lost',
      'seasons':{
        1:20,
        2:96,
        3:3
      },
      'runtime':60,
      'images':['http://slurm.trakt.us/images/posters/234.jpg']
    },

    {
      'title':'Weeds',
      'seasons':{
        1:2,
        2:6,
        3:9
      },
      'runtime':45,
      'images':['http://slurm.trakt.us/images/posters/40.3.jpg']
    },
    {
    'title':'The Simpsons',
    'seasons':{
      1:7,
      2:45,
      3:974,
      4:98,
      5:32
    },
    'runtime':21,
    'images':["http://slurm.trakt.us/images/posters/65.2.jpg"]
  },
   {
    'title':'Glee',
    'seasons':{
      1:8,
      2:5,
      3:4,
      4:8
    },
    'runtime':40,
    'images':["http://slurm.trakt.us/images/posters/114.30.jpg"]
  }



  ]
};

  return data;


});
