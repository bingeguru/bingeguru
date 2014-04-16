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

    $scope.getMovieInfo = function(slide){
        console.log("requested slide ", slide);
        var params1Movie = {'title': slide.title};
        getFiltered.getAShow(params1Movie).success(function(err, result){
          console.log("getAShow result ", result);
          $location.path( "/showDetail");
        });
      };

    $scope.submitFind = function(){
      var min;
      var max;
      if($scope.runtimeModel === 'under 30 min'){
        min = 0;
        max = 31;
      }else if($scope.runtimeModel === '30 - 45 min'){
        min = 30;
        max = 46;
      }else if($scope.runtimeModel === '60 min'){
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




}]);


appControllers.controller('findCtrl', ['$scope', '$http', function($scope, $http){


}]);

appControllers.controller('showDetailCtrl', ['$scope', '$location', 'getFiltered' , '$http', function ($scope, $location, getFiltered, $http) {
  $scope.requestShowData = function(){
    $scope.data = getFiltered.getReceivedShow();
    console.log("scopedata ", $scope.data);
    // console.log("scope datas ", getFiltered.getReceivedShow());
    // console.log("hi mom");
       // var seasonList =$scope.data.seasons;
       // // var totalSeasons = Object.keys(seasonList).length;
       // var totalEp = 0;
       // for(var episode in seasonList){
       //  totalEp += parseInt(seasonList[episode], 10);
       // // }

       // $scope.data['totalSeasons'] = totalSeasons;
       // $scope.data['totalEp'] = totalEp;
       // $scope.data['bingeHours'] = Math.floor(($scope.data['totalEp'] * $scope.data['runtime']) / 60);
       // $scope.data['bingeMins'] = ($scope.data['totalEp'] * $scope.data['runtime']) % 60;
       // $scope.data['bingeWeeks'] = Math.floor($scope.data['totalEp'] / 7);
       // $scope.data['bingeDays'] = $scope.data['totalEp'] % 7;
     
   };
   $scope.requestShowData();

}]);


appControllers.controller('discoverCtrl', ['$scope', '$http', 'getFiltered', function($scope, $http, getFiltered){

  $scope.requestShowData = function(){
    $scope.searchParams = getFiltered.getSearchParams();
    $scope.data = getFiltered.getReceivedData();
    console.log("Scopedata", $scope.data);
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
   };
   $scope.requestShowData();

   // shopping cart begin
  $scope.CartForm = function(){
      $scope.showCollection = {
          items: [],
          starredShows: []
          };

      $scope.addItem = function() {
        if($scope.showCollection.starredShows.indexOf(this.show.name) === -1) {
          $scope.showCollection.items.push({
            poster: this.show.poster,
            name: this.show.name,
            rating: "**Rating**",
            totalSeasons: this.show.totalSeasons,
            totalEp: this.show.totalEp,
            runtime: this.show.runtime,
            bingeHours: this.show.bingeHours,
            bingeMins: this.show.bingeMins,
            bingeWeeks: this.show.bingeWeeks,
            bingeDays: this.show.bingeDays,
            title: this.show.title
          });
          $scope.showCollection.starredShows.push(this.show.name);
        }
      };

      $scope.removeItem = function(index) {
          $scope.showCollection.items.splice(index, 1);
          $scope.showCollection.starredShows.splice(index,1);
        };
    };

   // shopping cart end

}]);

appControllers.factory('getFiltered', function($http){
  var receivedData;
  var searchParams;
  var receivedShow;
  var shows = {
   getComedies: function(args){
    searchParams = args;
    return $http.get('/getFiltered', {
      params: args

    })
    .success(function(data,status, headers, config){
      receivedData = data;
    })
    .error(function(data, status, headers, config){
      console.log('get error');
    });
   },

   getAShow: function(args){
    return $http.get('/getAShow', {
      params: args
    })
    .success(function(data,status, headers, config){
      console.log("getAShow Data ", data);
      receivedShow = data;
    })
    .error(function(data, status, headers, config){
      console.log('get error in getAshow');
    });
   },
   getReceivedData: function(){
      return receivedData;
   },
   getReceivedShow: function(){
      return receivedShow;
   },
   getSearchParams: function(){
       return searchParams;
   }
  };
  return shows;
});



// title: the-office
// name: the long name
// seasons: {1: 3, 2:5, 3:13}

// modal start

var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.items = [];

  $scope.open = function () {
    console.log('modal this: ', this);
    $scope.items.push(
      this.item.poster,
      this.item.name,
      this.item.rating,
      this.item.totalSeasons,
      this.item.totalEp,
      this.item.runtime,
      this.item.bingeHours,
      this.item.bingeMins,
      this.item.bingeWeeks,
      this.item.bingeDays,
      this.item.title
     );
    var modalInstance = $modal.open({
      template: "<div class='modal-header'>"+
      "<p>" + $scope.items[1] + "</p></div>" +
      "<div class='modal-body'>"+
      "<img class='modalPoster' src='"+ $scope.items[0] + "'>"+
      "<p>Summary: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>" +
      "<p>Rating: " + $scope.items[2] + "</p>" +
      "<p>Total # of Seasons: " + $scope.items[3] + "</p>" +
      "<p>Total # of Episodes: " + $scope.items[4] + "</p>" +
      "<p>Runtime: " + $scope.items[5] + "</p>" +
      "<p><a href = 'http://www.netflix.com'><img class='modalBrand' src = '../../images/netflix.jpeg'></a>"+
      "<a href = 'http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=" + $scope.items[10] + "'><img class='modalBrand' src = '../../images/amazon.jpeg'></a>"+
      "<a href = 'http://www.hulu.com/" + $scope.items[10] + "'><img class='modalBrand' src = '../../images/hulu.jpeg'></a>"+
      "<a href = 'http://www.itunes.com'><img class='modalBrand' src = '../../images/itunes.jpeg'></a></p>"+
      "</div>" +
      "<div class='modal-footer'>"+
      "<button class='btn btn-primary' ng-click='ok()'>CLOSE</button>"+
      "</div>"

      ,
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          console.log('scope.items ',$scope.items);
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };



};

// modal end
