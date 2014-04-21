var appShowDetailCtrl = angular.module('appShowDetailCtrl', ['ui.bootstrap', 'appFactories', 'appServices']);

appShowDetailCtrl.controller('showDetailCtrl', ['$scope', '$location', 'getFiltered', 'getSearchedShow', '$http', 'getBingeTimes', function ($scope, $location, getFiltered, getSearchedShow, $http, getBingeTimes) {
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
       getBingeTimes.calculate($scope.data);

    }
   };
   
   $scope.requestShowData();
}]);
