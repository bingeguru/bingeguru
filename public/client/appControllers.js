var appControllers = angular.module('appControllers', ['testData']);

appControllers.controller('homeCtrl', ['$scope', function($scope){

}]);

appControllers.controller('findCtrl', ['$scope', '$http', function($scope, $http){


}]);

appControllers.controller('discoverCtrl', ['$scope', 'testDataFactory', '$http', function($scope, testDataFactory, $http){
   // $scope.data = testDataFactory.shows;
   // for (var i = 0; i < $scope.data.length; i++) {
   //   var seasonList =$scope.data[i].seasons;
   //   var totalSeasons = Object.keys(seasonList).length
   //   var totalEp = 0;
   //   for(var episode in seasonList){
   //     totalEp += seasonList[episode];
   //   }

   //   $scope.data[i]['totalSeasons'] = totalSeasons;
   //   $scope.data[i]['totalEp'] = totalEp;
   // };
   // console.log($scope.data);

  $scope.requestShowData = function(){
    $http({method: 'GET', url: '/getShows'})
      .success(function(data, status, headers, config) {
        console.log(data);
        $scope.data = data;
         for (var i = 0; i < $scope.data.length; i++) {
           var seasonList =$scope.data[i].seasons;
           var totalSeasons = Object.keys(seasonList).length;
           var totalEp = 0;
           for(var episode in seasonList){
             totalEp += parseInt(seasonList[episode], 10);
     }

     $scope.data[i]['totalSeasons'] = totalSeasons;
     $scope.data[i]['totalEp'] = totalEp;
     $scope.data[i]['bingeHours'] = Math.floor(($scope.data[i]['totalEp'] * $scope.data[i]['runtime']) / 60);
     $scope.data[i]['bingeMins'] = ($scope.data[i]['totalEp'] * $scope.data[i]['runtime']) % 60;
     $scope.data[i]['bingeWeeks'] = Math.floor($scope.data[i]['totalEp'] / 7);
     $scope.data[i]['bingeDays'] = $scope.data[i]['totalEp'] % 7;


   };
      })
      .error(function(data, status, headers, config){
        console.log('get error');
      });
    console.log('in requestShowData');
   }
   $scope.requestShowData();

}]);


// title: the-office
// name: the long name
// seasons: {1: 3, 2:5, 3:13}
