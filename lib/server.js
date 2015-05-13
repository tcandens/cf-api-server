'use strict';

var express = require('express');
var Sql = require('sequelize');
var port = process.env.PORT || 3000;

var app = express();

var emperorsRouter = express.Router();

require('./routes/emperors_router')(emperorsRouter);

app.use('/api', emperorsRouter);

app.get('/', function(req, res) {
  res.json({message: 'Welcome, our API of Roman Emperors housed at the /api URL.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
