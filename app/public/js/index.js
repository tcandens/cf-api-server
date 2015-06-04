'use strict';

require('angular/angular');

var emperorsApp = angular.module('emperorsApp', []);

// SERVICES
require('./services/rest_resource')( emperorsApp );

// CONTROLLERS
require('./controllers/emperors_controller')( emperorsApp );

// DIRECTIVES
require('./directives/test_directive')( emperorsApp );
