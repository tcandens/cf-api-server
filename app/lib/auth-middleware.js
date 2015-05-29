'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function( secret ) {
  return function( req, res, next ) {
    var token = req.cookies.empToken;
    if ( !token ) {
      console.log( 'Not token' );
      return res.status(400).json({ message: 'Unauthorized' });
    }
    eat.decode( token, secret, function( err, decoded ) {
      if ( err ) {
        console.log( err );
        return res.status(400).json({ message: 'Unauthorized' });
      }
      console.log( decoded );
      // Check if token has expired
      if ( decoded.expires - new Date().getTime() < 3600000 ) {
        User.findOne({
          where: {
            id: decoded.id
          }
        })
          .then(function( user ) {
            // Attach authorized user model to request
            req.user = user;
            next();
          })
          .catch( console.log );
      } else {
        res.json({ message: 'Expired token' });
      }
    });
  }
}
