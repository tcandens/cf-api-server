'use strict';

module.exports = function( app ) {
  app.directive('testDirective', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/directives/templates/tester.html',
    }
  });
}
