var appServices = angular.module('appServices', ['appControllers', 'ngRoute']);

appServices.service('getFiltered', function($http){
  var receivedData;
  var searchParams;
  var receivedShow;
  var shows = {
   getComedies: function(args){
    searchParams = args;
    return $http.get('/getFiltered', {
      params: args

    })
    .success(function(data,status, headers, config){
      receivedData = data;
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });
   },

   getAShow: function(args){
    return $http.get('/getAShow', {
      params: args
    })
    .success(function(data,status, headers, config){
      console.log("getAShow Data ", data);
      receivedShow = data;
    })
    .error(function(data, status, headers, config){
      console.log('get error in getAshow');
    });
   },
   getReceivedData: function(){
      return receivedData;
   },
   getReceivedShow: function(){
      return receivedShow;
   },
   getSearchParams: function(){
       return searchParams;
   }
  };
  return shows;
});

appServices.service('getBingeTimes', function(){
  var bingeTimes = {
    calculate: function(show){
       show.totalSeasons = show.seasons[0][0];

       show.totalEp = 0;
       for (var i = 0; i < show.seasons.length; i++) {
          show.totalEp += show.seasons[i][1];
        }

       show.bingeHours = Math.floor(show.totalEp * show.runtime / 60);
       show.bingeMins = show.totalEp * show.runtime % 60;
       show.bingeWeeks = Math.floor(show.totalEp/ 7);
       show.bingeDays = show.totalEp % 7;
       
       show.actorList =show.people;
       show.quantity = 10;
    }
  };
  return bingeTimes;
});