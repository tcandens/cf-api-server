'use strict';

var $ = require('jquery');

var $app = $('#app');
var $emperorList = $('#emperors');

$.ajax({
  url: 'http://localhost:3000/api/emperor',
  method: 'GET',
  contentType: 'application/json',
})
  .done(function( data ) {
    data.forEach(function( emperor ) {
      var newHTML = '</li>\n' +
                    '<h2>' + emperor.name + '</h2>\n' +
                    '<p>Birth: ' + ( emperor.birth || 'No Data' ) +
                    ' Death: ' + ( emperor.death || 'No Data' ) + '</p></li>';
      $emperorList.append( newHTML );
    });
  })
  .fail(function( err ) {
    console.log( err );
  });
