'use strict';

var $ = require('jquery');

var $app = $('#app');
var $emperorList = $('#emperors');

$('#login').on('submit', function( e ) {
  e.preventDefault();
  var username = $('#username').val();
  var password = $('#password').val();
  $.ajax({
    url: 'http://localhost:3000/users/login',
    method: 'GET',
    contentType: 'application/json',
    headers: {"Authorization": "Basic " + btoa(username + ":" + password) }
  })
    .done(function( data ) {
      console.log( data );
    })
    .fail(function( err ) {
      console.log( err );
    })
    .always(function() {
      console.log( 'Form submitted' );
    })
});

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
