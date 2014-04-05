var appControllers = angular.module('appControllers', ['testData']);

appControllers.controller('homeCtrl', ['$scope', function($scope){
}]);

appControllers.controller('discoverCtrl', ['$scope', function($scope){
}]);

appControllers.controller('findCtrl', ['$scope', 'testDataFactory', function($scope, testDataFactory){
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


}]);
