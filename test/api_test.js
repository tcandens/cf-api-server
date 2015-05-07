'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/edicts_test';
require('../lib/server');

var Edict = require('../lib/models/edict');

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('Edicts API', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('Should send greeting with info on API location', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(res.body.message).to.equal('Welcome, our API of Papal Edicts is housed at the /api URL.');
        done();
      });
  });

  it('Should post an edict', function(done) {
    chai.request('localhost:3000')
      .post('/api/edict')
      .send({title: 'Indulgences'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('created');
        done();
      });
  });

  it('Should GET list of all edicts', function(done) {
    chai.request('localhost:3000')
      .get('/api/edict')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('PUT and DELETE', function(done) {

    beforeEach(function(done) {
      var testEdict = new Edict({title: 'Test Edict', pope: 'Julius!'});
      testEdict.save(function(err, data) {
        if (err) throw err;
        this.testEdict = data;
        done();
      }.bind(this));
    });

    it('Should update existing edict', function(done) {
      var id = this.testEdict._id;
      chai.request('localhost:3000')
        .put('/api/edict/' + id )
        .send({title: 'Updated edict'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('updated');
          done();
        });
    });

    it('Should delete existing edict', function() {
      var id = this.testEdict._id;
      chai.request('localhost:3000')
        .del('/api/edict/' + id )
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('deleted');
        });
    });
  });

});
