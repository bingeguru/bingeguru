var appControllers = angular.module('appControllers', ['ui.bootstrap', 'appFactories', 'appServices']);

appControllers.controller('homeCtrl', ['$scope', function($scope){}]);

appControllers.controller('errCtrl', ['$scope', '$location', 'getFiltered' ,'getAllShows', 'getSearchedShow', '$http', function ($scope, $location, getFiltered, getAllShows, getSearchedShow, $http) {
   $scope.showNames = [];
    for (var i = 0; i < getAllShows.showNames.length; i++) {
      $scope.showNames.push(getAllShows.showNames[i].name);
    };

    $scope.submitSearch = function(slugName){
      var searchParam = {'name': slugName};
      getSearchedShow.getAShow(searchParam).success(function(err, result){
        
        $location.path( "/showDetail/:" + slugName);
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

       $scope.data[i]['totalSeasons'] = totalSeasons;
       $scope.data[i]['totalEp'] = totalEp;
       $scope.data[i]['bingeHours'] = Math.floor(($scope.data[i]['totalEp'] * $scope.data[i]['runtime']* $scope.data[i]['totalSeasons']) / 60);
       $scope.data[i]['bingeMins'] = ($scope.data[i]['totalEp'] * $scope.data[i]['runtime']) % 60;
       $scope.data[i]['bingeWeeks'] = Math.floor(($scope.data[i]['totalEp']* $scope.data[i]['totalSeasons']) / 7);
       $scope.data[i]['bingeDays'] = ($scope.data[i]['totalEp']* $scope.data[i]['totalSeasons']) % 7;
     }
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });

}]);


appControllers.controller('ButtonsCtrl', ['$scope', '$location', 'getFiltered' ,'getAllShows', 'getSearchedShow', '$http', function ($scope, $location, getFiltered, getAllShows, getSearchedShow, $http) {

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
    };

    $scope.submitSearch = function(slugName){
      var searchParam = {'name': slugName};
      getSearchedShow.getAShow(searchParam).success(function(err, result){
        
        $location.path( "/showDetail/:" + slugName);
      });
    }

    $scope.getShowInfo = function(slide){
        // console.log("requested slide ", slide);
        var params1Show = {'title': slide.title};
        getFiltered.getAShow(params1Show).success(function(err, result){
          console.log("getAShow result ", result);
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

         $scope.data[i]['totalSeasons'] = totalSeasons;
         $scope.data[i]['totalEp'] = totalEp;
         $scope.data[i]['bingeHours'] = Math.floor(($scope.data[i]['totalEp'] * $scope.data[i]['runtime']* $scope.data[i]['totalSeasons']) / 60);
         $scope.data[i]['bingeMins'] = ($scope.data[i]['totalEp'] * $scope.data[i]['runtime']) % 60;
         $scope.data[i]['bingeWeeks'] = Math.floor(($scope.data[i]['totalEp']* $scope.data[i]['totalSeasons']) / 7);
         $scope.data[i]['bingeDays'] = ($scope.data[i]['totalEp']* $scope.data[i]['totalSeasons']) % 7;
     }
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });




}]);



appControllers.controller('showDetailCtrl', ['$scope', '$location', 'getFiltered', 'getSearchedShow', '$http', function ($scope, $location, getFiltered, getSearchedShow, $http) {
  console.log(" location ", $location.path());

  $scope.requestShowData = function(){
    // $scope.data = getFiltered.getReceivedShow() || getSearchedShow.getReceivedShow();
    // console.log("scopedata ", $scope.data);
    
   // if(!$scope.data){
    var urlName = (""+ $location.path());
    title = urlName.slice(13);
    // console.log(title);
        $http.get('/getSearchedShow', {
          params: {'name': title}
        })
        .success(function(data, status, headers, config){
          // console.log("getASearchedShowData ", data);
          $scope.data = data;
          createShowVars();

        })
        .error(function(data, status, headers, config){
          console.log('get error in getAshow');
        });
       // }else{createShowVars();}

    function createShowVars(){
       if(!$scope.data.seasons){ $location.path('/error');}
       var seasonList =$scope.data.seasons;
       var totalSeasons = seasonList.length;
       var totalEp = 0;
       for (var i = 0; i < seasonList.length; i++) {
          totalEp += seasonList[i][1];
          // totalEp += parseInt(seasonList[episode], 10);
        } 
       $scope.actorList =$scope.data.people;
       $scope.quantity = 10;
       

       $scope.data['totalSeasons'] = totalSeasons;
       $scope.data['totalEp'] = totalEp;
       $scope.data['totaltime'] = ($scope.data['totalEp'] * $scope.data['runtime'] * $scope.data['totalSeasons']);
       $scope.data['bingeHours'] = Math.floor(($scope.data['totaltime'] / 60));
       $scope.data['bingeMins'] = ($scope.data['totalEp'] * $scope.data['runtime']* $scope.data['totalSeasons']) % 60;
       $scope.data['bingeWeeks'] = Math.floor(($scope.data['totalEp'] * $scope.data['totalSeasons'])/ 7);
       $scope.data['bingeDays'] = ($scope.data['totalEp'] * $scope.data['totalSeasons']) % 7;
    }
   };

   $scope.requestShowData();
  

}]);
