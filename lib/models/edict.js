'use strict';

var mongoose = require('mongoose');

var edictSchema = mongoose.Schema({
  title: String,
  date: String,
  pope: String,
  subject: String
});

module.exports = mongoose.model('Edict', edictSchema);
