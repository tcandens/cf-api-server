'use strict';

var expect = require('chai').expect;
var greeting = require('../../app/public/js/test_greeting');

describe('Test Test', function() {
  it('testing', function( done ) {
    expect(greeting('Hello')).to.eql('Hello, you!');
    done();
  });
});
