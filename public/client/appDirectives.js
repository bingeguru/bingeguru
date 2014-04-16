var directive = angular.module('angApp.directive', []);
directive.directive('hide', function(){
  function link(scope, element, attrs){
    element.on('click', function(){
      // element.remove();
    });
  }
  return {
    restrict: 'EA',
    link: link
  };
});