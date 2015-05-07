'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 8000;

var Edict = require('./models/edict')

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/edicts_dev');

var edictRouter = express.Router();

app.use('/api', edictRouter);

edictRouter.use( bodyParser.json() );

edictRouter.get('/edict', function(req, res) {
  Edict.find({}, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Catastrophy'});
    }
    res.json(data);
  });
});

edictRouter.post('/edict', function(req, res) {
  var newEdict = new Edict(req.body);
  console.log(newEdict);
  newEdict.save(function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Catastrophy'});
    }
    res.json({message: 'success'});
  });
});

app.get('/', function(req, res) {
  res.json({message: 'Welcome, our API of Papal Edicts is housed at the /api URL.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
