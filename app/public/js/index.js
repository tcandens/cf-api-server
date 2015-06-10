'use strict';

require('angular/angular');
require('angular-route');

var emperorsApp = angular.module('emperorsApp', ['ngRoute']);

// SERVICES
require('./services/rest_resource')( emperorsApp );

// CONTROLLERS
require('./controllers/emperors_controller')( emperorsApp );

// DIRECTIVES
require('./directives/test_directive')( emperorsApp );

// ROUTER
emperorsApp.config(['$routeProvider', function( $routeProvider ) {
  $routeProvider
    .when('/emperors', {
      templateUrl: 'js/views/templates/emperors_list.html',
      controller: 'emperorsController'
    })
    .when('/login', {
      templateUrl: 'js/views/templates/login_form.html',
      controller: 'authorizationController'
    })
    .when('/', {
      redirectTo: '/emperors'
    })
    .otherwise({
      redirectTo: '/login'
    })
}]);
