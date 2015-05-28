'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('../models/User');

var authRouter = module.exports = function( router, passport ) {

  router.use( bodyParser.json() );

  router.post('/new', function( req, res ) {
    User.generateHash( req.body.password, function( err, hash ) {
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
          user.generateToken( process.env.SECRET, function( err, token ) {
            if ( err ) {
              console.log( err );
              return res.status(500).json({ message: "Cannot generate token" });
            }
            res.json({ message: 'User created', token: token });
          })
        })
        .catch(function( err ) {
          res.json({ message: 'Cannot create user' });
          console.log('Trouble creating user: ' + err );
        })
    })
  })

  router.get('/login', passport.authenticate('basic', { session: false }),
    function( req, res ) {
      req.user.generateToken( process.env.SECRET, function( err, token ){
        if ( err ) {
          console.log( err );
          return res.status(500).json({ message: "Cannot generate token" });
        }
        res.clearCookie('empToken');
        res.cookie('empToken', token, { maxAge: 160000, httpOnly: false });
        res.json({ "token": token });
      });
  })
}
