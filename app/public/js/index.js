'use strict';

require('angular/angular');

var emperorsApp = angular.module('emperorsApp', []);

emperorsApp.controller( 'emperorsController', [ '$scope', '$http', function( $scope, $http ) {
  $scope.emperors = [];
  $scope.errors = [];

  $scope.fetchAll = function() {
    $http.get('/api/emperor')
      .success(function( data ) {
        $scope.emperors = data;
      })
      .error(function( err ) {
        $scope.errors.push( err );
      })
  }
}]);


// require('./controllers/emperors_controller')( emperorsApp );
