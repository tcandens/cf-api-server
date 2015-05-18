'use strict';

var DB = process.env.DB || 'emperors_dev';
var DBUSER = process.env.DBUSER || 'emperors_dev';
var DBPASS = process.env.DBPASS || 'kikapoo';

var Sql = require('sequelize');
var bcrypt = require('bcrypt');
var eat = require('eat');

var sql = new Sql( DB, DBUSER, DBPASS, { dialect: 'postgres' });

var User = sql.define('User', {
  username: Sql.STRING,
  email: { type: Sql.STRING, validate: { isEmail: true }, unique: true },
  password: { type: Sql.STRING }
}, {
  classMethods: {
    generateHash: function( password, callback ) {
      bcrypt.genSalt( 8, function( err, salt ) {
        bcrypt.hash( password, salt, function( err, hash ) {
          callback( err, hash );
        });
      });
    }
  },

  instanceMethods: {
    getId: function() {
      return this.getDataValue( 'id' );
    },
    checkPassword: function( password, callback ) {
      bcrypt.compare( password, this.getDataValue( 'password' ), function( err, res ) {
        callback( err, res );
      });
    },
    generateToken: function( secret, callback ) {
      eat.encode({ id: this.getId(), expires: ( new Date().getTime() + 3600000 ) }, secret, callback );
    }
  }
});

User.sync();

module.exports = User;
