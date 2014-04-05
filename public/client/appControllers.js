var appControllers = angular.module('appControllers', ['testData']);

appControllers.controller('homeCtrl', ['$scope', function($scope){

}]);

appControllers.controller('findCtrl', ['$scope', function($scope){
}]);

appControllers.controller('discoverCtrl', ['$scope', 'testDataFactory', '$http', function($scope, testDataFactory, $http){
   $scope.data = testDataFactory.shows;
   for (var i = 0; i < $scope.data.length; i++) {
     var seasonList =$scope.data[i].seasons;
     var totalSeasons = Object.keys(seasonList).length
     var totalEp = 0;
     for(var episode in seasonList){
       totalEp += seasonList[episode];
     }

     $scope.data[i]['totalSeasons'] = totalSeasons;
     $scope.data[i]['totalEp'] = totalEp;
   };
   console.log($scope.data);

  $scope.requestShowData = function(){
    $http({method: 'GET', url: '/getShows'})
      .success(function(data, status, headers, config) {
        console.log('get success')
      })
      .error(function(data, status, headers, config){
        console.log('get error');
      });
   }

}]);
