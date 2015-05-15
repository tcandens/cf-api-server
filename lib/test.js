var User = require('./models/User');

User.create({username: 'Test', email: 'joey.thies@gmail.com', password: 'turds' })
  .then(function( user ) {
    console.log( user.get( 'password' ) );
  })
  .catch( console.log );
