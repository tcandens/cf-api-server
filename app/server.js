'use strict';

// Global Variables
var port = process.env.PORT || 4000;
process.env.SECRET = process.env.SECRET || 'changemechangemechangeme!'

// Dependancies
var express = require('express');
var Sql = require('sequelize');
var passport = require('passport');
var auth = require('./lib/auth-middleware');

var app = express();
// Declare Empty Routers to be Passed Through
var emperorsRouter = express.Router();
var authRouter = express.Router();


// Initialize Passport;
app.use( passport.initialize() );
// Passport middleware passed through, populates req.user if successful
require('./lib/basic_strategy')( passport );

// Pass generic routers through routing functions with required middleware
require('./routes/emperors_router')( emperorsRouter, passport );
require('./routes/authorization_router')( authRouter, passport );

app.use('/api', emperorsRouter );
app.use('/users', authRouter );

app.use( '/*', express.static( __dirname + '/public/index.html'), function( req, res, next ) {
  next();
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
