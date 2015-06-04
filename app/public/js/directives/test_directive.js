'use strict';

var template = require('html!./templates/tester.html');

module.exports = function( app ) {
  app.directive('testDirective', function() {
    return {
      restrict: 'EA',
      template: template,
    }
  });
}
