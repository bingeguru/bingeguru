var angApp = angular.module('angApp', [
  'ngRoute', 'appControllers', 'testData', 'angApp.directive'
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
      .when('/discover', {
        templateUrl: 'client/views/discover.html',
        controller: 'discoverCtrl'
      })
      .when('/find', {
        templateUrl: 'client/views/find.html',
        controller: 'findCtrl'
      })
      .when('/showDetail', {
        templateUrl: 'client/views/showDetail.html',
        controller: 'showDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

