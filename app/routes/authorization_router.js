'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/User');

var authRouter = module.exports = function( router, passport ) {

  router.use( bodyParser.json() );

  router.post('/new', function( req, res ) {
    User.methods.generateHash( req.body.password, function( err, hash ) {
      if ( err ) {
        console.log( err );
        res.status(500).json({ message: 'Cannot create user' });
      }
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash
      })
        .then(function( user ) {
          res.json({ message: 'User created' });
          console.log( user );
        })
        .catch(function( err ) {
          res.json({ message: 'Cannot create user' });
          console.log('Trouble creating user: ' + err );
        })
    })
  })

  router.get('/login', passport.authenticate('basic', { session: false }),
    function( req, res ) {
      res.json({ message: 'Signed In' })
  })
}
