'use strict';

var port = process.env.PORT = 3333;
var DB = process.env.DB = 'emperors_test';
require('../app/lib/server');

var Emperor = require('../app/lib/models/emperor');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('Emperors API', function() {

  after(function(done) {
    Emperor.destroy({
      where: {
        id: { $gt: 0 }
      }
    })
      .then(function( dropped ) {
        console.log( 'Test tables dropped' )
      })
    done();
  });

  it('should send greeting with info on API location', function(done) {
    chai.request('localhost:' + port)
      .get('/')
      .end(function(err, res) {
        expect(res.body.message).to.equal('Welcome, our API of Roman Emperors housed at the /api URL.');
        done();
      });
  });

  it('should post an emperor', function(done) {
    chai.request('localhost:' + port)
      .post('/api/emperor')
      .send({name: 'TEST', birth: 100, death: 100})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('created TEST');
        done();
      });
  });

  it('should GET list of all emperors', function(done) {
    chai.request('localhost:' + port)
      .get('/api/emperor')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should get a single emperor by name', function(done) {
    chai.request('localhost:' + port)
      .get('/api/emperor/name/' + 'TEST')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(1);
        done();
      });
  });

  describe('PUT and DELETE', function() {

    afterEach(function( done ) {
      Emperor.destroy({
        where: {
          id: { $gt: 0 }
        }
      })
        .then(function( destroyed ) {
          console.log( 'Tester dropped' );
        })
        .catch( console.log );
      done();
    })

    it('Should update existing emperor', function(done) {
      Emperor.create({
        name: 'Test',
        birth: 200,
        death: 220
      })
        .then(function( tester ) {
          chai.request('localhost:' + port)
            .put('/api/emperor/' + tester.id )
            .send({name: 'Updated emperor'})
            .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.message).to.eql('updated');
              done();
            });
        })
        .catch( console.log );
    });

    it('Should delete existing emperor', function() {
      Emperor.create({
        name: 'Test',
        birth: 200,
        death: 220
      })
        .then(function( tester ) {
          chai.request('localhost:' + port )
            .del('/api/emperor/' + tester.id )
            .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.message).to.eql('destroyed')
              done();
            });
        })
        .catch( console.log );
    });
  });
});
