var User = require('./models/User');

User.methods.generateHash( 'dicks', function( err, hash ) {
  User.create({ username: 'Toddd', email: 'toddd@toddd.com', password: hash })
    .then(function( user ) {
      console.log( user.getDataValue( 'password' ));
    })
})
