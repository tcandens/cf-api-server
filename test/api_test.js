'use strict';

process.env.SECRET = process.env.SECRET || 'changemechangemechangeme!';
var port = process.env.PORT = 3333;
var DB = process.env.DB = 'emperors_test';
require('../app/server');

var Emperor = require('../app/models/Emperor');
var User = require('../app/models/User');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('Emperors API', function() {

  before(function( done ) {
    this.user = User.build({ username: 'test', email: 'test@example.com' })
    this.user.generateToken( process.env.SECRET, function( err, token ) {
      if ( err ) console.log( err );
      this.token = token;
    }.bind( this ));
    done();
  })

  it('should post an emperor', function(done) {
    chai.request('localhost:' + port)
      .post('/api/emperor')
      .send({name: 'TEST', birth: 100, death: 100, token: this.token })
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

  describe('PUT and DELETE', function() {

    beforeEach(function( done ) {
      var self = this;
      Emperor.create({
        name: 'Test',
        birth: 200,
        death: 220
      })
        .then(function( emperor ) {
          this.testEmperor = emperor;
          done();
        }.bind( self ))
    })

    afterEach(function() {
      Emperor.destroy({
        where: {
          id: { $gt: 0 }
        }
      })
        .then(function( destroyed ) {
          console.log( 'Tester dropped' );
        })
        .catch( console.log );
    })

    it('Should update existing emperor', function(done) {
      console.log( this );
      chai.request('localhost:' + port)
        .put('/api/emperor/' + this.testEmperor.id )
        .send({name: 'Updated emperor', token: this.token })
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('updated');
          done();
        });
    });

    it('Should delete existing emperor', function( done ) {
      chai.request('localhost:' + port )
        .del('/api/emperor/' + this.testEmperor.id )
        .send({ token: this.token })
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('destroyed')
          done();
        });
    });
  });
});
