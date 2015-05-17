'use strict';

var port = process.env.PORT || 3000;
process.env.SECRET = 'changemechangemechangeme!'

var express = require('express');
var Sql = require('sequelize');
var passport = require('passport');

var app = express();

app.use( passport.initialize() );

var emperorsRouter = express.Router();
var authRouter = express.Router();

require('./lib/basic_strategy')( passport );

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
