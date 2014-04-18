var appDiscoverCtrl = angular.module('appDiscoverCtrl', ['ui.bootstrap', 'appFactories', 'appServices']);

appDiscoverCtrl.controller('discoverCtrl', ['$scope', '$http', 'getFiltered','$location', 'getBingeTimes', function($scope, $http, getFiltered, $location, getBingeTimes){

  $scope.requestShowData = function(){
    $scope.data = getFiltered.getReceivedData();
     //REFRESH GET REQUEST
      var urlName = (""+ $location.path());
      $scope.min = urlName.slice(11,13);
      $scope.max = urlName.slice(15,17);
      $scope.genres = urlName.slice(19);
     if(!$scope.data){
      $http.get('/getFiltered', {
        params: {'genres':$scope.genres,
          'min':$scope.min,
          'max':$scope.max
        }
      })
      .success(function(data,status, headers, config){
        $scope.data = data;
        timeStats();
      })
      .error(function(data, status, headers, config){
        console.log('get error');
      });
      }else {
        timeStats();
     }
     function timeStats(){
        for (var i = 0; i < $scope.data.length; i++) {
         getBingeTimes.calculate($scope.data[i]);
       }
     }
   };
   
   if($scope.min === '10' && $scope.max === '61'){
      $scope.runtime = 'All';
   }else{
      $scope.runtime = $scope.max - 1;
   }

   $scope.requestShowData();

   // starred shows
  $scope.CartForm = function(){
      $scope.showCollection = {
          items: [],
          starredShows: []
          };

      $scope.addItem = function() {
        if($scope.showCollection.starredShows.indexOf(this.show.name) < 0) {
          $scope.showCollection.starredShows.push(this.show.name);
          $scope.showCollection.items.push({
            poster: this.show.poster,
            name: this.show.name,
            rating: this.show.ratings,
            totalSeasons: this.show.totalSeasons,
            totalEp: this.show.totalEp,
            runtime: this.show.runtime,
            bingeHours: this.show.bingeHours,
            bingeMins: this.show.bingeMins,
            bingeWeeks: this.show.bingeWeeks,
            bingeDays: this.show.bingeDays,
            title: this.show.title
          });
        }
      };

      $scope.removeItem = function(index) {
          $scope.showCollection.items.splice(index, 1);
          $scope.showCollection.starredShows.splice(index,1);
        };
    };
}]);

var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.open = function () {
    $scope.items = [];
    $scope.items.push(
      this.show.poster,
      this.show.name,
      this.show.ratings,
      this.show.totalSeasons,
      this.show.totalEp,
      this.show.runtime,
      this.show.bingeHours,
      this.show.bingeMins,
      this.show.bingeWeeks,
      this.show.bingeDays,
      this.show.title,
      this.show.overview
     );
    var modalInstance = $modal.open({
      template: "<div class='modal-header'>"+
      "<h2 class= 'modalTitle'>" + $scope.items[1] + "</h></div>" +

      "<div class='modal-body'>"+
      "<div class='row'>"+
      "<div class='col-md-6'>"+
      "<img class='modalPoster' src='"+ $scope.items[0] + "'>"+
      "</div>"+

      "<div class='col-md-6'>"+
      "<p>Summary: "+ $scope.items[11] +"</p>" +

      "</div>"+

      "</div>"+

      "<div class='container'>"+
      "<p>Rating: " + $scope.items[2] + "</p>" +
      "<p>Total # of Seasons: " + $scope.items[3] + "</p>" +
      "<p>Total # of Episodes: " + $scope.items[4] + "</p>" +
      "<p>Runtime: " + $scope.items[5] + "</p>" +
      "<button class='btn btn-primary' ng-click='sendToDetail("+'"'+$scope.items[1]+'"'+"); ok()'>Learn More</button>"+
      "<p><a href = 'http://www.netflix.com'><img class='modalBrand' src = '../../images/netflix.jpeg'></a>"+
      "<a href = 'http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=" + $scope.items[10] + "'><img class='modalBrand' src = '../../images/amazon.jpeg'></a>"+
      "<a href = 'http://www.hulu.com/search?q=" + $scope.items[10] + "'><img class='modalBrand' src = '../../images/hulu.jpeg'></a>"+
      "<a href = 'http://www.itunes.com'><img class='modalBrand' src = '../../images/itunes.jpeg'></a></p>"+
      "</div>" +
      "</div>" +
      "<div class='modal-footer'>"+
      "<button class='btn btn-primary' ng-click='ok()'>CLOSE</button>"+
      "</div>",
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

var ModalInstanceCtrl = function ($scope, $modalInstance, items, $location) {

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

  $scope.sendToDetail = function(arg){
    var stringArg = ""+arg;
    $location.path( "/showDetail/:" + stringArg);
  };
};

// modal end
