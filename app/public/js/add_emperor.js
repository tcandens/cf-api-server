'use strict';

var $ = require('jquery');
var fetchEmperors = require('./fetch_emperors');

module.exports = function( port, endpoint, event, callback ) {
  event.preventDefault();
  var name = $('#emperorName').val();
  var birth = $('#emperorBirth').val();
  var death = $('#emperorDeath').val();
  $.ajax({
    url: 'http://localhost:' + port + endpoint,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"name": name, "birth": birth, "death": death})
  })
    .done(function( data ) {
      fetchEmperors( port, endpoint );
      if ( callback )
        callback( data );
    })
    .fail(function( err ) {
      console.log( err );
    })
    .always();
}
