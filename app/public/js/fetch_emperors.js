'use strict';

var $ = require('jquery');

module.exports = function( port, endpoint, callback ) {
  $.ajax({
    url: 'http://localhost:' + port + endpoint,
    method: 'GET',
    contentType: 'application/json',
  })
    .done(function( data ) {
      console.log( data );
      $('#emperors').html('');
      data.forEach(function( emperor ) {
        var newHTML = '</li class="emperor">\n' +
                      '<h2>' + emperor.name + '</h2>\n' +
                      '<p>Birth: ' + ( emperor.birth || 'No Data' ) +
                      ' Death: ' + ( emperor.death || 'No Data' ) + '</p></li>';
        $('#emperors').append( newHTML );
      });
      if ( callback )
        callback( data );
    })
    .fail(function( err ) {
      console.log( err );
    });
};
