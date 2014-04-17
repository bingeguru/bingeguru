var angApp = angular.module('angApp', [
  'ngRoute', 'appControllers', 'testData', 'angApp.directive', 'appFactories'
]);

// angApp.factory('getRequestParams',
// }]);


angApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'client/views/home.html',
        controller: 'homeCtrl'
      })
      .when('/discover/:min/:max/:genre', {
        templateUrl: 'client/views/discover.html',
        controller: 'discoverCtrl'
      })
      .when('/find', {
        templateUrl: 'client/views/find.html',
        controller: 'findCtrl'
      })
      .when('/showDetail/:title', {
        templateUrl: 'client/views/showDetail.html',
        controller: 'showDetailCtrl'
      })
      .when('/about', {
        templateUrl: 'client/views/about.html',
        controller: 'homeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
