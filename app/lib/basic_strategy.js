'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function( passport ) {
  passport.use(new Basic(function( username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    })
      .then(function( user ) {
        if ( !user ) {
          console.log( 'no user' );
          done( null, false );
        }
        user.checkPassword( password, function( err, res ) {
          console.log( 'wrong password' );
          if ( !res ) done( err, false );
          if ( res ) done( null, user );
        });
      });
  }));
};
