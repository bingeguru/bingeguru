var appControllers = angular.module('appControllers', ['ui.bootstrap', 'appFactories']);

appControllers.controller('homeCtrl', ['$scope', function($scope){

}]);
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


    // $scope.params = {'genres':genres};

    var callback = function(){
      console.log("CONNECTION YEHAW");
    };

    $scope.getShowInfo = function(slide){
        console.log("requested slide ", slide);
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
    console.log(title);
        $http.get('/getSearchedShow', {
          params: {'name': title}
        })
        .success(function(data, status, headers, config){
          console.log("getASearchedShowData ", data);
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



appControllers.controller('discoverCtrl', ['$scope', '$http', 'getFiltered','$location', function($scope, $http, getFiltered, $location){

  $scope.requestShowData = function(){
    $scope.data = getFiltered.getReceivedData();
     //REFRESH GET REQUEST
     console.log("scope data", $scope.data)
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
     };
   };

   console.log("247",$scope.min, $scope.max);
   
   if($scope.min === '10' && $scope.max === '61'){
      $scope.runtime = 'All'
   }else{
      $scope.runtime = $scope.max - 1;
   }

   $scope.requestShowData();


       //  $http.get('/getSearchedShow', {
       //    params: {'name': title}
       //  })
       //  .success(function(data, status, headers, config){
       //    console.log("getASearchedShowData ", data);
       //    $scope.data = data;
       //  })
       //  .error(function(data, status, headers, config){
       //    console.log('get error in getAshow');
       //  });
       // }else{$scope.data = $scope.data;}

   // shopping cart begin
  $scope.CartForm = function(){
      $scope.showCollection = {
          items: [],
          starredShows: []
          };

      $scope.addItem = function() {
        if($scope.showCollection.starredShows.indexOf(this.show.name) < 0) {
          console.log("STARRED   :"+$scope.showCollection.starredShows);
          $scope.showCollection.starredShows.push(this.show.name);
          console.log("STARRED   :"+$scope.showCollection.starredShows);
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
          console.log("showcollection", $scope.showCollection.starredShows)
        }
      };

      $scope.removeItem = function(index) {
          $scope.showCollection.items.splice(index, 1);
          $scope.showCollection.starredShows.splice(index,1);
        };
    };

   // shopping cart end



}]);

appControllers.service('getFiltered', function($http){
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
