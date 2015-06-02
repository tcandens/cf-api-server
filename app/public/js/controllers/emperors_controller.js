'use strict';

module.exports = function( app ) {
  app.controller( 'emperorsController', [ '$scope', '$http', function( $scope, $http ) {
    $scope.emperors = [];
    $scope.errors = [];

    $scope.fetchAll = function() {
      $http.get('/api/emperor')
        .success(function( data ) {
          $scope.emperors = data;
        })
        .error(function( err ) {
          console.log( err );
          $scope.errors.push( err );
        })
    };

    $scope.addEmperor = function() {
      $http.post('/api/emperor', $scope.newEmperor )
        .success(function( data ) {
          $scope.emperors.push( $scope.newEmperor );
          $scope.newEmperor = null;
        })
        .error(function( err ) {
          console.log( err );
          $scope.errors.push( err );
        })
    };

    $scope.destroyEmperor = function( emperor ) {
      $scope.emperors.splice( $scope.emperors.indexOf( emperor ), 1 );
      $http.delete('/api/emperor/' + emperor.id )
        .error(function( err ) {
          console.log( err );
          $scope.errors.push( err );
        })
    };

    $scope.saveEmperor = function( emperor ) {
      $http.put('/api/emperor/' + emperor.id, emperor )
        .success(function( data ) {
          $scope.emperors[ $scope.emperors.indexOf( emperor ) ].editing = false;
        })
        .error(function( err ) {
          $scope.errors.push( err );
        })
    };

    $scope.editEmperor = function( emperor ) {
      // Find any other open editing forms
      var editing = $scope.emperors.filter( function( emp ) {
        return emp.editing;
      });
      // Close other editing forms if open
      if ( editing.length ) {
        editing.forEach(function( el ) {
          el.editing = false;
        });
      };
      $scope.emperors[ $scope.emperors.indexOf( emperor ) ].editing = true;
      $scope.editingEmperor = angular.copy( emperor );
    };

    $scope.cancelEditEmperor = function( emperor ) {
      $scope.emperors[ $scope.emperors.indexOf( emperor ) ] = $scope.editingEmperor;
      $scope.emperors[ $scope.emperors.indexOf( $scope.editingEmperor ) ].editing = false;
    };
  }]);
};
