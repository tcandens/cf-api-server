'use strict';

var $ = require('jquery');

module.exports = function( port, endpoint, event, callback ) {
  event.preventDefault();
  var username = $('#username').val();
  var password = $('#password').val();
  $.ajax({
    url: 'http://localhost:' + port + endpoint,
    method: 'GET',
    contentType: 'application/json',
    headers: {"Authorization": "Basic " + btoa(username + ":" + password) }
  })
    .done(function( data ) {
      $('body').append('<aside id="alertSuccess">Login Successful</aside>');
      $('#login').fadeOut();
      $('#addEmperor').fadeIn();
      if ( callback )
        callback( data );
    })
    .fail(function( err ) {
      console.log( err );
    })
    .always(function() {
      console.log( 'Form submitted' );
    })
}
