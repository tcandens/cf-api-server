'use strict';

var DB = process.env.DB || 'emperors_dev';
var DBUSER = process.env.DBUSER || 'emperors_dev';
var DBPASS = process.env.DBPASS || 'kikapoo';

var Sql = require('sequelize');
var sql = new Sql( DB, DBUSER, DBPASS,
  {
    dialect: 'postgres'
});

var Emperor = module.exports = sql.define('Emperor', {
  name: Sql.STRING,
  birth: Sql.STRING,
  death: Sql.STRING,
  predecessor: Sql.STRING,
  successor: Sql.STRING
});

Emperor.sync();
