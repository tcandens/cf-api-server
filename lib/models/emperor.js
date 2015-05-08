'use strict';

var mongoose = require('mongoose');

var emperorSchema = mongoose.Schema({
  name: { type: String, required: true, match: /^[A-Z]*[a-z]\w+/},
  birth: { type: Number, required: true, min: -100, max: 1400 },
  death: { type: Number, required: true, min: 0, max: 1400 },
  reign: Array,
  predecessor: { type: String },
  successor: { type: String }
});

module.exports = mongoose.model('Emperor', emperorSchema);
