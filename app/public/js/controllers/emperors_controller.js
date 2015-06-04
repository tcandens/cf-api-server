'use strict';

module.exports = function( app ) {
  app.controller( 'emperorsController', [ '$scope', '$REST', '$http', function( $scope, $rest, $http ) {
    var Emperor = $rest('emperor');
    $scope.emperors = [];
    $scope.errors = [];

    $scope.fetchAll = function() {
      Emperor.fetchAll( function( err, data ) {
        if ( err ) return $scope.errors.push( { message: 'Could not fetch emperors' } );
        $scope.emperors = data;
      });
    }
    $scope.addEmperor = function() {
      Emperor.add( $scope.newEmperor, function( err, data ) {
        if ( err ) return $scope.errors.push( { message: 'Could not add emperors' } );
        // Break Binding with form
        var pushEmperor = angular.copy( $scope.newEmperor );
        $scope.emperors.push( pushEmperor );
      });
    }
    $scope.destroyEmperor = function( emperor ) {
      $scope.emperors.splice( $scope.emperors.indexOf( emperor ), 1 );
      Emperor.destroy( emperor, function( err, data ) {
        if ( err ) return $scope.errors.push( { message: 'Could not depose emperor' } );
      });
    }
    $scope.saveEmperor = function( emperor ) {
      Emperor.save( emperor, function( err, data ) {
        if ( err ) return $scope.errors.push( { message: 'Could not modify emperor' } );
        $scope.emperors[ $scope.emperors.indexOf( emperor ) ].editing = false;
      });
    }
    $scope.toggleEdit = function( emperor ) {
      // Cancel editing
      if ( emperor.editing ) {
        $scope.emperors[ $scope.emperors.indexOf( emperor ) ] = $scope.editingEmperor;
        $scope.emperors[ $scope.emperors.indexOf( $scope.editingEmperor ) ].editing = false
      } else {
        // Close all other edits
        $scope.emperors.filter( function( e ) {
          return e.editing;
        }).forEach(function( el ) {
          el.editing = false;
        });
      }
      // If nothing, open edit and copy object to break binding
      $scope.emperors[ $scope.emperors.indexOf( emperor ) ].editing = true;
      $scope.editingEmperor = angular.copy( emperor );
    }
  }]);
};
