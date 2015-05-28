'use strict';

module.exports = function( app ) {
  app.controller( 'emperorsController', [ $scope, $http ], function( $scope, $http ) {
    $scope.emperors = [];
    $scope.errors = [];

    $scope.fetchAll = function() {
      $http.get('/api/emperors')
        .success(function( data ) {
          $scope.emperors = data;
        })
        .error(function( err ) {
          $scope.errors.push( err );
        })
    }
  });
}
