var appControllers = angular.module('appControllers', ['ui.bootstrap', 'appFactories', 'appServices']);

appControllers.controller('homeCtrl', ['$scope', function($scope){}]);

appControllers.controller('errCtrl', ['$scope', '$location', 'getFiltered' ,'getAllShows', 'getSearchedShow', '$http', 'getBingeTimes', function ($scope, $location, getFiltered, getAllShows, getSearchedShow, $http, getBingeTimes) {
   $scope.showNames = [];
    for (var i = 0; i < getAllShows.showNames.length; i++) {
      $scope.showNames.push(getAllShows.showNames[i].name);
    }

    $scope.submitSearch = function(slugName){
      var searchParam = {'name': slugName};
      getSearchedShow.getAShow(searchParam).success(function(err, result){
        
        $location.path( "/showDetail/:" + slugName);
      });
    };
    $scope.getShowInfo = function(slide){
        var params1Show = {'title': slide.title};
        getFiltered.getAShow(params1Show).success(function(err, result){
          $location.path( "/showDetail/:" + slide.name);
        });
     };

   //carousel
 $scope.myInterval = 5000;
  return $http.get('/slider', {})
    .success(function(data,status, headers, config){
     $scope.data = data;
      for (var i = 0; i < $scope.data.length; i++) {
       getBingeTimes.calculate(scope.data[i]);
     }
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });
    
}]);







