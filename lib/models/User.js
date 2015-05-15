'use strict';

var DB = process.env.DB || 'emperors_dev';
var DBUSER = process.env.DBUSER || 'emperors_dev';
var DBPASS = process.env.DBPASS || 'kikapoo';

var Sql = require('sequelize');
var bcrypt = require('bcrypt');

var sql = new Sql( DB, DBUSER, DBPASS, { dialect: 'postgres' })

var User = sql.define('User', {
  username: Sql.STRING,
  email: { type: Sql.STRING, validate: { isEmail: true } },
  password: {
    type: Sql.STRING,
    set: function( password ) {
      var self = this;
      bcrypt.genSalt( 8, function( err, salt ) {
        bcrypt.hash( password, salt, function( err, hash ) {
          this.setDataValue( 'password', hash );
        })
      });
    },
    get: function() {
      return this.getDataValue( 'password' );
    }
  }
});

User.sync();

module.exports = User;
