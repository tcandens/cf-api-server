'use strict';

var DB = DB || 'emperors_dev';
var DBUSER = DBUSER || 'emperors_dev';
var DBPASS = DBPASS || 'kikapoo';

console.log(DB);

var Sql = require('sequelize');
var sql = new Sql(
    ( DB || process.env.DB ),
    ( DBUSER || process.env.DBUSER ),
    ( DBPASS || process.env.DBPASS ),
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
