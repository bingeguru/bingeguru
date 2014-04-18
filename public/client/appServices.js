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

appServices.service('bingeTimeCalc', function(){
 
  
});





