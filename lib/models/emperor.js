'use strict';

var Sql = require('sequelize');
var sql = new Sql('emperors_dev', 'emperors_dev', 'kikapoo', {
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
