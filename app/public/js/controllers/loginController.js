'use strict';

module.exports = function( app ) {
  app.controller( 'loginController', [ '$scope', '$http', function( $scope, $http ) {
    $scope.errors = [];
    $scope.authenticated = false;

    $scope.login = function() {
      $http.get('/users/login', )
        .success(function( data ) {
          $scope.authenticated = true;
        })
        .error(function( err ) {
          $scope.errors.push( err );
        })
    }
  }]);
};
