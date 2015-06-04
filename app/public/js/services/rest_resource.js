'use strict';

module.exports = function( app ) {

  var handleError = function( callback ) {
    return function( data ) {
      console.log( data );
      callback( data );
    }
  };
  var handleSuccess = function( callback ) {
    return function( data ) {
      console.log( data );
      callback( null, data );
    }
  };

  app.factory( '$REST', [ '$http', function( $http ) {
    return function( resourceName ) {
      return {
        fetchAll: function( callback ) {
          $http.get('/api/' + resourceName )
            .success( handleSuccess( callback ) )
            .error( handleError( callback ) );
        },
        add: function( resourceData, callback ) {
          $http.post('/api/' + resourceName, resourceData )
            .success( handleSuccess( callback ) )
            .error( handleError( callback ) );
        },
        save: function( resourceData, callback ) {
          $http.put('/api/' + resourceName + '/' + resourceData.id, resourceData )
            .success( handleSuccess( callback ) )
            .error( handleError( callback ) );
        },
        destroy: function( resourceData, callback ) {
          $http.delete('/api/' + resourceName + '/' + resourceData.id )
            .success( handleSuccess( callback ) )
            .error( handleError( callback ) );
        }
      }
    };
  }]);
};
