'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.DB, process.env.DBUSER, process.env.DBPASS, {
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
