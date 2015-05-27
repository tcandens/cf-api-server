'use strict';

var $ = require('jquery');



$('#addEmperor').hide();

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
      $('body').append('<aside id="alertSuccess">Login Successful</aside>');
      $('#login').fadeOut();
      $('#addEmperor').fadeIn();
      // $('#alertSuccess').fadeOut('slow');
    })
    .fail(function( err ) {
      console.log( err );
    })
    .always(function() {
      console.log( 'Form submitted' );
    })
});

$('#addEmperor').on('submit', function( e ) {
  e.preventDefault();
  var name = $('#emperorName').val();
  var birth = $('#emperorBirth').val();
  var death = $('#emperorDeath').val();
  $.ajax({
    url: 'http://localhost:3000/api/emperor',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"name": name, "birth": birth, "death": death})
  })
    .done(function( data ) {
      fetchEmperors();
    })
    .fail(function( err ) {
      console.log( err );
    })
    .always();
});

var fetchEmperors = function() {
  $.ajax({
    url: 'http://localhost:3000/api/emperor',
    method: 'GET',
    contentType: 'application/json',
  })
    .done(function( data ) {
      console.log( data );
      $('#emperors').html('');
      data.forEach(function( emperor ) {
        var newHTML = '</li>\n' +
                      '<h2>' + emperor.name + '</h2>\n' +
                      '<p>Birth: ' + ( emperor.birth || 'No Data' ) +
                      ' Death: ' + ( emperor.death || 'No Data' ) + '</p></li>';
        $('#emperors').append( newHTML );
      });
    })
    .fail(function( err ) {
      console.log( err );
    });
};

$(function() {
  fetchEmperors();
});
