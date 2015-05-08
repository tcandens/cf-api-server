'use strict';

var mongoose = require('mongoose');

var emperorSchema = mongoose.Schema({
  name: String,
  dob: { type: Date, default: Date.now },
  death: { type: Date },
  reign: Array,
  predecessor: String,
  successor: String
});

module.exports = mongoose.model('Emperor', emperorSchema);
