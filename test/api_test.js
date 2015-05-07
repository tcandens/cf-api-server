'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/edicts_test';
require('../lib/server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('Edicts API', function() {
  it('Should send greeting with info on API location', function(done) {
    chai.request('localhost:8000')
      .get('/')
      .end(function(err, res) {
        expect(res.body.message).to.equal('Welcome, our API of Papal Edicts is housed at the /api URL.');
        done();
      });
  });
});
