var appControllers = angular.module('appControllers', ['ui.bootstrap', 'appFactories', 'appServices']);

appControllers.controller('homeCtrl', ['$scope', function($scope){}]);

appControllers.controller('errCtrl', ['$scope', '$location', 'getFiltered' ,'getAllShows', 'getSearchedShow', '$http', function ($scope, $location, getFiltered, getAllShows, getSearchedShow, $http) {
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
       var seasonList =$scope.data[i].seasons;
       var totalSeasons = Object.keys(seasonList).length;
       var totalEp = 0;
       for(var episode in seasonList){
        totalEp += parseInt(seasonList[episode], 10);
       }

       $scope.data[i].totalSeasons = totalSeasons;
       $scope.data[i].totalEp = totalEp;
       $scope.data[i].bingeHours = Math.floor(($scope.data[i].totalEp * $scope.data[i].runtime * $scope.data[i].totalSeasons) / 60);
       $scope.data[i].bingeMins = ($scope.data[i].totalEp * $scope.data[i].runtime) % 60;
       $scope.data[i].bingeWeeks = Math.floor(($scope.data[i].totalEp* $scope.data[i].totalSeasons) / 7);
       $scope.data[i].bingeDays = ($scope.data[i].totalEp* $scope.data[i].totalSeasons) % 7;
     }
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });
    
}]);







