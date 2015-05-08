'use strict';

var mongoose = require('mongoose');

var emperorSchema = mongoose.Schema({
  name: { type: String, required: true, match: /([A-Z]{1}[a-z]+[^0-9])+([\s]{0,1})([a-z]{0,2}[^0-9_]){0,1}([\s])/},
  birth: { type: Number, required: true, min: -100, max: 1400 },
  death: { type: Number, required: true, min: 0, max: 1400 },
  reign: Array,
  predecessor: { type: String, match: /([A-Z]{1}[a-z]+[^0-9])+([\s]{0,1})([a-z]{0,2}[^0-9_]){0,1}([\s])/},
  successor: { type: String, match: /([A-Z]{1}[a-z]+[^0-9])+([\s]{0,1})([a-z]{0,2}[^0-9_]){0,1}([\s])/}
});

module.exports = mongoose.model('Emperor', emperorSchema);
