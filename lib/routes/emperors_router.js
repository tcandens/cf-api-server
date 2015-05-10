'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var Emperor = require('../models/emperor');

var emperorsRouter = module.exports = function(router) {

  router.use( bodyParser.json() );

  router.route('/emperor')
    .get(function(req, res, next) {
      Emperor.find({}, function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({message:'Internal error'});
        }
        res.json(data);
      });
    })
    .post(function(req, res, next) {
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
    })
    .delete(function(req, res, next) {
      Emperor.remove({}, function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({message:'Internal Error'});
        }
        res.json({message:'all deleted'});
      });
    });


  router.route('/emperor/:id')
    .put(function(req, res) {
      var updateEmperor = req.body;
      delete updateEmperor._id;
      Emperor.update({'_id': req.params.id}, updateEmperor, function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({message: 'Internal Error'});
        }
        res.json({message: 'updated'});
      });
    })
    .delete(function(req, res) {
      Emperor.remove({'_id': req.params.id}, function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({message: 'Internal Error'});
        }
        res.json({message: 'deleted'});
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
};
