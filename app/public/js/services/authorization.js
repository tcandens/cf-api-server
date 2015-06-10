'use strict';

module.exports = function( app ) {
  app.factory('authService', [ '$http', '$base64', '$cookies', function( $http, $base64, $cookies ) {
    return {
      login: function( user, callback ) {
        var encoded = $base64.encode( user.username + ':' + user.password );
        $http.get('/users/login', {
          headers: {'Authorization': 'Basic ' + encoded }
        })
          .success(function( data ) {
            console.log( data );
            $cookies.put('empToken', data.token );
            callback( null );
          })
          .error(function( err ) {
            callback( err );
          });
      },
      create: function( user, callback ) {
        $http.post('/users/new', user )
          .success(function( data ) {
            console.log( data );
            $cookies.put('empToken', data.token)
          })
          .error(function( err ) {
            callback( err );
          });
      },
      logout: function() {
        $cookies.put('empToken', '');
      },
      isLoggedIn: function() {
        return !!( $cookies.get('empToken') && $cookies.get('empToken').length );
      }
    }
  }]);
};
