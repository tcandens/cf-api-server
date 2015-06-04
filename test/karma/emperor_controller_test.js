'use strict';

require('../../app/public/js/index');
require('angular-mocks');

describe('Emperors controller', function() {
  var $ControllerContructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('emperorsApp'));

  beforeEach(angular.mock.inject(function( $rootScope, $controller ) {
    $scope = $rootScope.$new();
    $ControllerContructor = $controller;
  }));

  describe('REST actions', function() {

    beforeEach(angular.mock.inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      this.emperorsController = $ControllerContructor('emperorsController', { $scope: $scope });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return array of emperors', function() {
      $httpBackend.expectGET('/api/emperor').respond(200, [{id: 1, name: 'Harold', birth: 200, death: 200}]);
      $scope.fetchAll();
      $httpBackend.flush();
      expect($scope.emperors[0].name).toBe('Harold');
      expect($scope.errors.length).toBe(0);
    });

    it('should save a new emperor', function() {
      $scope.newEmperor = {name: 'Tim', birth: 100, death: 100};
      $httpBackend.expectPOST('/api/emperor').respond(200, $scope.newEmperor);
      $scope.addEmperor();
      $httpBackend.flush();
      expect($scope.emperors[0].name).toBe('Tim');
      expect($scope.newEmperor).toBe(null);
    });

    it('should destroy emperor record', function() {
      var emperor = { id: 666, name: 'Alec' };
      $scope.emperors.push( emperor );
      $httpBackend.expectDELETE('/api/emperor/666').respond(200, { message: 'destroyed'} );
      expect($scope.emperors.indexOf( emperor )).not.toBe(-1);
      $scope.destroyEmperor( emperor );
      expect($scope.emperors.indexOf( emperor )).toBe(-1);
      $httpBackend.flush();
    });

    it('should update an emperor record', function() {
      var emperor = { id: 404, name: 'Brucie' };
      $scope.emperors.push( emperor );
      $scope.editEmperor( emperor );
      emperor.name = 'Bruce';
      $httpBackend.expectPUT('/api/emperor/' + emperor.id, emperor ).respond(200, [ emperor ]);
      $scope.saveEmperor( emperor );
      $httpBackend.flush();
      expect($scope.emperors[0].name).toBe('Bruce');
    });

  });

});
