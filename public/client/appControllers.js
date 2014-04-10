var appControllers = angular.module('appControllers', ['ui.bootstrap']);

appControllers.controller('homeCtrl', ['$scope', function($scope){

}]);

appControllers.controller('ButtonsCtrl', ['$scope', 'getFiltered', function ($scope, getFiltered) {

    $scope.radioModel = 'binge';
    $scope.checkModel = {
      comedy: false,
      drama: false,
      scifi: false,
      action: false,
      adventure: false,
      fantasy: false,
      reality: false,
      soap: false,
      animation: false,
      children: false,
      under30: false,
      between3060: false,
      over60: false,
      hulu: false,
      netflix: false,
      amazon: false
    };

    var callback = function(){
      console.log("CONNECTION YEHAW");
    };

    getFiltered.getComedies().success(callback);


}]);

// var ButtonsCtrl = function ($scope) {
//   $scope.checkModel = {
//     comedy: true,
//     drama: true,
//     scifi: true
//   };
// };

appControllers.controller('findCtrl', ['$scope', '$http', function($scope, $http){


}]);

appControllers.controller('discoverCtrl', ['$scope', '$http', function($scope, $http){
   // $scope.data = getAllFactory;
   // for (var i = 0; i < $scope.data.length; i++) {
   //   var seasonList =$scope.data[i].seasons;
   //   var totalSeasons = Object.keys(seasonList).length;
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

appControllers.factory('getFiltered', function($http){
  return {
     getComedies: function(){
      return $http.get('/getFiltered', {
        params: {genre: ['comedy']}
      })
      .success(function(data, status, headers, config){
        console.log(data);
        return data;
      })
      .error(function(data, status, headers, config){
        console.log('get error');
      });
     }

  };
});


// title: the-office
// name: the long name
// seasons: {1: 3, 2:5, 3:13}
