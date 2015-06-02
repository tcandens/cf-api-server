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
          done( null, false );
        }
        user.checkPassword( password, function( err, res ) {
          if ( !res ) done( err, false );
          if ( res ) done( null, user );
        });
      });
  }));
};
