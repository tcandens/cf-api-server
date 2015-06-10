'use strict';

require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var emperorsApp = angular.module('emperorsApp', ['ngRoute', 'ngCookies', 'base64']);

// SERVICES
require('./services/rest_resource')( emperorsApp );
require('./services/authorization')( emperorsApp );

// CONTROLLERS
require('./controllers/emperors_controller')( emperorsApp );
require('./controllers/authorization_controller')( emperorsApp );

// DIRECTIVES
require('./directives/auth_directive')( emperorsApp );

// ROUTER
emperorsApp.config(['$routeProvider', function( $routeProvider ) {
  $routeProvider
    .when('/emperors', {
      templateUrl: '../templates/views/emperors_list.html',
      controller: 'emperorsController'
    })
    .when('/login', {
      templateUrl: '../templates/views/login_form.html',
      controller: 'authController'
    })
    .when('/', {
      redirectTo: '/emperors'
    })
    .otherwise({
      redirectTo: '/login'
    })
}]);
