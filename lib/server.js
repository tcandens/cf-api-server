'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/emperors_dev');

var emperorsRouter = express.Router();

require('./routes/emperors_router')(emperorsRouter);

app.use('/api', emperorsRouter);

app.get('/', function(req, res) {
  res.json({message: 'Welcome, our API of Roman Emperors housed at the /api URL.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
