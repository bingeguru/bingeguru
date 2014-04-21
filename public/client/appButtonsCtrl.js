var appButtonsCtrl = angular.module('appButtonsCtrl', ['ui.bootstrap', 'appFactories', 'appServices']);

appButtonsCtrl.controller('ButtonsCtrl', ['$scope', '$location', 'getFiltered' ,'getAllShows', 'getSearchedShow', '$http', 'getBingeTimes', function ($scope, $location, getFiltered, getAllShows, getSearchedShow, $http, getBingeTimes) {

    $scope.bingeModel = 'binge';
    $scope.genresModel = 'All';
    $scope.runtimeModel = 'All';

    $scope.providerModel = {
      All : true,
      hulu: false,
      netflix: false,
      amazon: false
    };

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

    $scope.submitFind = function(){
      var min;
      var max;
      if($scope.runtimeModel === 'under 30 min'){
        min = 10;
        max = 31;
      }else if($scope.runtimeModel === '30 - 45 min'){
        min = 32;
        max = 46;
      }else if($scope.runtimeModel === '60 min'){
        min = 47;
        max = 61;
      }else{
        min = 10;
        max = 61;
      }
      //params for
      var params = {'genres':$scope.genresModel,
      'min':min,
      'max':max
    };
      getFiltered.getComedies(params).success(function(err, result){
        $location.path( "/discover/:"+ params.min+"/:"+params.max+"/:"+params.genres);
      });
    };



//carousel
 $scope.myInterval = 5000;
  return $http.get('/slider', {})
    .success(function(data,status, headers, config){
     $scope.data = data;
      for (var i = 0; i < $scope.data.length; i++) {
       getBingeTimes.calculate($scope.data[i]);
     }
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });
}]);