/**
 * Created by USER on 02/08/2017.
 */
var passport = require ('passport');
var Strategy = require('passport-google-oauth20').Strategy;
var Usuario = require ('../app/models/user');

passport.serializeUser(function(usuario,done){
  done(null,usuario._id);
})

passport.deserializeUser(function (id,done) {
  Usuario.findById(id, function (err,user) {
    done(err,user);
  })
})
passport.use(new GoogleStrategy({
    clientID:  "894365078349-b282nb278osvhnktku33s3ovrm247jks.apps.googleusercontent.com",
    clientSecret: " K9WosmWdumb90PyjFKKaWa2b ",
    callbackURL: 'https://proyecto17api.dis.eafit.edu.co/login/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
}));

exports.estaAutenticado = function (req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }else{
    res.status(401).send('Tienes que hacer log in para acceder a este recurso');
  }
}
