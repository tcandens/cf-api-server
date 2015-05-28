'use strict';

var $ = require('jquery');
var fetchEmperors = require('./fetch_emperors');
var addEmperor = require('./add_emperor');
var login = require('./login');

$('#login').on('submit', function( e ) {
  login( 3000, '/users/login', e );
});

$('#addEmperor').on('submit', function( e ) {
  addEmperor( 3000, '/api/emperor', e );
});

$(function() {
  $('#addEmperor').hide();
  fetchEmperors( 3000, '/api/emperor' );
});
