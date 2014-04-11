var appControllers = angular.module('appControllers', ['ui.bootstrap']);

appControllers.controller('homeCtrl', ['$scope', function($scope){

}]);

appControllers.controller('ButtonsCtrl', ['$scope', '$location', 'getFiltered' , '$http', function ($scope, $location, getFiltered, $http) {

    $scope.bingeModel = 'binge';
    $scope.genresModel = 'All';
    $scope.runtimeModel = 'All';

    $scope.providerModel = {
      All : true,
      hulu: false,
      netflix: false,
      amazon: false
    };



    // $scope.params = {'genres':genres};

    var callback = function(){
      console.log("CONNECTION YEHAW");
    };



    $scope.submitFind = function(){
      var min;
      var max;
      if($scope.runtimeModel === 'under30'){
        min = 0;
        max = 31;
      }else if($scope.runtimeModel === 'between3045'){
        min = 30;
        max = 46;
      }else if($scope.runtimeModel === 'between4560'){
        min = 45;
        max = 61;
      }else{
        min = 0;
        max = 1000;
      }
      //params for
      var params = {'genres':$scope.genresModel,
      'min':min,
      'max':max
    };
      getFiltered.getComedies(params).success(function(err, result){
        console.log("GET COMEDIES", result);
        $scope.test = result;
        $location.path( "/discover");
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
       $scope.data[i]['bingeHours'] = Math.floor(($scope.data[i]['totalEp'] * $scope.data[i]['runtime']) / 60);
       $scope.data[i]['bingeMins'] = ($scope.data[i]['totalEp'] * $scope.data[i]['runtime']) % 60;
       $scope.data[i]['bingeWeeks'] = Math.floor($scope.data[i]['totalEp'] / 7);
       $scope.data[i]['bingeDays'] = $scope.data[i]['totalEp'] % 7;
     }
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });




  // $scope.addSlide = function() {
  //   var newWidth = 600 + slides.length;
  //   slides.push({
  //     image: 'http://placekitten.com/' + newWidth + '/300',
  //     text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
  //       ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
  //   });
  // };
  // for (var i=0; i<4; i++) {
  //   $scope.addSlide();
  // }


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

appControllers.controller('discoverCtrl', ['$scope', '$http', 'getFiltered', function($scope, $http, getFiltered){
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


     }
      })
       .error(function(data, status, headers, config){
         console.log('get error');
       });
     console.log('in requestShowData');
  };
   $scope.requestShowData();

}]);

appControllers.factory('getFiltered', function($http){
  var shows = {
   getComedies: function(args){
    return $http.get('/getFiltered', {
      params: args
    })
    .success(function(data,status, headers, config){
      console.log(data);
      shows.data = data;
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });
   }
  };
  return shows;
});


// title: the-office
// name: the long name
// seasons: {1: 3, 2:5, 3:13}
