var User = require('./models/User');

User.findOne({
  where: {
    username: 'Toddd'
  }
})
  .then(function( user ) {
    console.log( user );
  })
