'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/emperors_test';
// process.env.PORT = 3333;
require('../lib/server');

var Emperor = require('../lib/models/emperor');

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('Emperors API', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('Should send greeting with info on API location', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(res.body.message).to.equal('Welcome, our API of Roman Emperors housed at the /api URL.');
        done();
      });
  });

  it('Should post an emperor', function(done) {
    chai.request('localhost:3000')
      .post('/api/emperor')
      .send({name: 'Julian', birth: 100, death: 100})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('created');
        done();
      });
  });

  it('Should GET list of all emperors', function(done) {
    chai.request('localhost:3000')
      .get('/api/emperor')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('PUT and DELETE', function(done) {

    beforeEach(function(done) {
      var testEmperor = new Emperor({name: 'Test', birth: 100, death: 100 });
      testEmperor.save(function(err, data) {
        if (err) throw err;
        this.testEmperor = data;
        done();
      }.bind(this));
    });

    it('Should update existing emperor', function(done) {
      var id = this.testEmperor._id;
      chai.request('localhost:3000')
        .put('/api/emperor/' + id )
        .send({title: 'Updated emperor'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('updated');
          done();
        });
    });

    it('Should delete existing emperor', function() {
      var id = this.testEmperor._id;
      chai.request('localhost:3000')
        .del('/api/emperor/' + id )
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('deleted');
        });
    });
  });

});
