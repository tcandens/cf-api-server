'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var Emperor = require('../models/emperor')

var emperorsRouter = module.exports = function(router) {

  router.use( bodyParser.json() );

  router.get('/emperor', function(req, res) {
    Emperor.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Failure to retrieve emperors'});
      }
      res.json(data);
    });
  });

  router.get('/emperor/:name', function(req, res) {
    Emperor.find({name: req.params.name}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(400).json({message: 'Internal Error'});
      }
      res.json(data);
    });
  });

  router.post('/emperor', function(req, res) {
    var newEmperor = new Emperor(req.body);
    newEmperor.validate(function(err) {
      if (err) {
        console.log(err);
        return res.json({message: 'invalid'});
      }
      newEmperor.save(function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({message: 'Internal Error'});
        }
        res.json({message: 'created', send: data});
      });
    });
  });

  router.put('/emperor/:id', function(req, res) {
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

  router.delete('/emperor/:id', function(req, res) {
    Emperor.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Failure to delete edict'});
      }
      res.json({message: 'deleted'});
    });
  });
}
