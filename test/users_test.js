'use strict';

var port = process.env.PORT = 3333;
var DB = process.env.DB = 'emperors_test';
require('../app/server');

var User = require('../app/models/User');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('User authorization routes', function() {

  after(function() {
    User.destroy({
      where: {
        id: { $gt: 0 }
      }
    })
      .catch( console.log );
  });

  it('should create a new user and return a token', function( done ) {
    chai.request('localhost:' + port )
      .post('/users/new')
      .send({
        username: 'test',
        email: 'test@example.com',
        password: 'test123'
      })
      .end(function( err, res ) {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('User created')
        expect(res.body.token).to.exist;
        done();
      });
  });

  it('should login user and return a token', function( done ) {
    chai.request('localhost:' + port )
      .get('/users/login')
      .auth('test', 'test123')
      .end(function( err, res ) {
        expect(err).to.eq(null);
        console.log(res.body);
        expect(res.body.token).to.exist;
        done();
      })
  })

});
