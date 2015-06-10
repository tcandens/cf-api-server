'use strict';

module.exports = function( app ) {
  app.directive('authDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: 'templates/directives/auth_directive.html',
      // controller: [ '$scope', '$location', 'authService', function( $scope, $location, authService ) {
      //   $scope.checkLogin = function() {
      //     if ( !authorizationService.isLoggedIn() ) {
      //       $location.path( '/login' );
      //     }
      //   }
      //   $scope.loginRedirect = function() {
      //     $location.path( '/login' );
      //   }
      // }]
    };
  });
};
