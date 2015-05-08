'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var Emperor = require('./models/emperor')

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/emperors_dev');

var emperorsRouter = express.Router();
emperorsRouter.use( bodyParser.json() );

app.use('/api', emperorsRouter);

emperorsRouter.get('/emperor', function(req, res) {
  Emperor.find({}, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Failure to retrieve emperors'});
    }
    res.json(data);
  });
});

emperorsRouter.get('/emperor/:name', function(req, res) {
  Emperor.find({name: req.params.name}, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(400).json({message: 'Internal Error'});
    }
    res.json(data);
  });
});

emperorsRouter.post('/emperor', function(req, res) {
  console.log(req);
  var newEmperor = new Emperor(req.body);
  newEmperor.save(function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Failure to create edict'});
    }
    res.json({message: 'created', send: data});
  });
});

emperorsRouter.put('/emperor/:id', function(req, res) {
  var updateEmperor = req.body;
  delete updateEmperor._id;

  Emperor.update({'_id': req.params.id}, updateEmperor, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Failure to update edicts'});
    }
    res.json({message: 'updated'});
  });
});

emperorsRouter.delete('/emperor/:id', function(req, res) {
  Emperor.remove({'_id': req.params.id}, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Failure to delete edict'});
    }
    res.json({message: 'deleted'});
  });
});

app.get('/', function(req, res) {
  res.json({message: 'Welcome, our API of Roman Emperors housed at the /api URL.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
