var appControllers = angular.module('appControllers', ['testData']);

appControllers.controller('homeCtrl', ['$scope', function($scope){
}]);

appControllers.controller('discoverCtrl', ['$scope', function($scope){
}]);

appControllers.controller('findCtrl', ['$scope', 'testDataFactory', function($scope, testDataFactory){
   $scope.data = testDataFactory.shows;
   console.log($scope.data);
}]);
