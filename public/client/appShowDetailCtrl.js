var appShowDetailCtrl = angular.module('appShowDetailCtrl', ['ui.bootstrap', 'appFactories', 'appServices']);

appShowDetailCtrl.controller('showDetailCtrl', ['$scope', '$location', 'getFiltered', 'getSearchedShow', '$http', function ($scope, $location, getFiltered, getSearchedShow, $http) {
  console.log(" location ", $location.path());

  $scope.requestShowData = function(){
    
    var urlName = (""+ $location.path());
    title = urlName.slice(13);
        $http.get('/getSearchedShow', {
          params: {'name': title}
        })
        .success(function(data, status, headers, config){
          $scope.data = data;
          createShowVars();
        })
        .error(function(data, status, headers, config){
          console.log('get error in getAshow');
        });

    function createShowVars(){
       if(!$scope.data.seasons){ $location.path('/error');}
       var seasonList =$scope.data.seasons;
       var totalSeasons = seasonList.length;
       var totalEp = 0;
       for (var i = 0; i < seasonList.length; i++) {
          totalEp += seasonList[i][1];
        } 
       $scope.actorList =$scope.data.people;
       $scope.quantity = 10;
       

       $scope.data.totalSeasons = totalSeasons;
       $scope.data.totalEp = totalEp;
       $scope.data.totaltime = ($scope.data.totalEp * $scope.data.runtime * $scope.data.totalSeasons);
       $scope.data.bingeHours = Math.floor(($scope.data.totaltime / 60));
       $scope.data.bingeMins = ($scope.data.totalEp * $scope.data.runtime * $scope.data.totalSeasons) % 60;
       $scope.data.bingeWeeks = Math.floor(($scope.data.totalEp * $scope.data.totalSeasons)/ 7);
       $scope.data.bingeDays = ($scope.data.totalEp * $scope.data.totalSeasons) % 7;
    }
   };
   
   $scope.requestShowData();
}]);
