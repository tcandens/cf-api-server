'use strict';

// Global Variables
var port = process.env.PORT || 3000;
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

app.get('/', function(req, res) {
  res.json({message: 'Welcome, our API of Roman Emperors housed at the /api URL.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
