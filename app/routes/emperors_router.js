'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Emperor = require('../models/Emperor');
var authorize = require('../lib/auth-middleware')( process.env.SECRET );

var emperorsRouter = module.exports = function( router, passport ) {

  router.use( bodyParser.json() );

  router.route('/emperor')
    .get(function(req, res) {
      Emperor.findAll({})
        .then( function( emperors ) {
          res.json( emperors );
        })
        .catch( console.log );
    })
    .post( authorize, function(req, res) {
      Emperor.create( req.body )
        .then(function( newEmperor ) {
          res.json({message: 'created ' + newEmperor.name });
        })
        .catch( console.log );
    })
    .delete(function(req, res) {
      Emperor.destroy({
        where: {
          id: {$gt: 0}
        }
      })
        .then(function( dropped ) {
          res.json({ message: 'all emperors dropped' });
        });
    });

  router.route('/emperor/:id')
    .get(function(req, res) {
      Emperor.findOne({
        where: {
          id: req.params.id
        }
      })
        .then(function( emperor ) {
          res.json( emperor );
        })
        .catch( console.log );
    })
    .put(function(req, res) {
      Emperor.findOne( req.params.id )
        .then(function( toUpdate ) {
          toUpdate.update( req.body )
            .then(function( updated ) {
              res.json({message: 'updated' });
            });
        })
        .catch( console.log );
    })
    .delete(function(req, res) {
      Emperor.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(function( destroyed ) {
          res.json({ message: 'destroyed' });
        })
        .catch( console.log );
    });

  router.route('/emperor/name/:name')
    .get(function( req, res ) {
      Emperor.findAll({
        where: {
          name: req.params.name
        }
      })
        .then(function( emperor ) {
          res.json( emperor );
        })
        .catch( console.log );
    });
};
