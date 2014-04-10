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

   $scope.predicate = '-name';


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
            name: this.show.name + " **Show Description**",
            rating: "**Rating**",
            totalSeasons: this.show.totalSeasons,
            totalEp: this.show.totalEp,
            runtime: this.show.runtime,
            bingeHours: this.show.bingeHours,
            bingeMins: this.show.bingeMins,
            bingeWeeks: this.show.bingeWeeks,
            bingeDays: this.show.bingeDays
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
      this.item.bingeDays
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
      "<a href = 'http://www.amazon.com'><img class='modalBrand' src = '../../images/amazon.jpeg'></a>"+
      "<a href = 'http://www.hulu.com'><img class='modalBrand' src = '../../images/hulu.jpeg'></a>"+
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
