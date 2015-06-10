'use strict';

module.exports = function( app ) {
  app.controller( 'authController', [ '$scope', '$location', 'authService', function( $scope, $location, authService ) {
    $scope.errors = [];
    
    $scope.loginSubmit = function( e, user ) {
      e.preventDefault();
      authService.login( user, function( err ) {
        if ( err ) {
          console.log( err );
          return $scope.errors.push({ message: 'Could not login' });
        }
        $location.path('/emperors');
      })
    }

  }]);
};
