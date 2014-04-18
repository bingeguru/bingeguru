var appButtonsCtrl = angular.module('appButtonsCtrl', ['ui.bootstrap', 'appFactories', 'appServices']);

appButtonsCtrl.controller('ButtonsCtrl', ['$scope', '$location', 'getFiltered' ,'getAllShows', 'getSearchedShow', '$http', function ($scope, $location, getFiltered, getAllShows, getSearchedShow, $http) {

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
        min = 30;
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