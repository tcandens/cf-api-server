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
          emperor.editing = null;
        })
        .error(function( err ) {
          $scope.errors.push( err );
        })
    };
  }]);
};
