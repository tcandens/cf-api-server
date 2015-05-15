var User = require('./models/User');

User.methods.generateHash( 'dicks', function( err, hash ) {
  User.create({ username: 'Toddd', email: 'toddd@toddd.com', password: hash })
    .then(function( user ) {
      console.log( user.getDataValue( 'password' ));
    })
})

User.findOne({
  where: {
    username: 'Toddd'
  }
})
  .then(function( user ) {
    User.methods.checkPassword( 'dicks', user.getDataValue('password'), function( err, res ) {
      if ( res ) {
        console.log( 'Password matched' );
      } else {
        console.log( 'Wrong password' );
      }
    })
  })
  .catch( console.log )
