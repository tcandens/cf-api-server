'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 8000;

var app = express();

app.get('/', function(req, res) {
  res.json({fuck: 'shit'});
  res.end();
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
