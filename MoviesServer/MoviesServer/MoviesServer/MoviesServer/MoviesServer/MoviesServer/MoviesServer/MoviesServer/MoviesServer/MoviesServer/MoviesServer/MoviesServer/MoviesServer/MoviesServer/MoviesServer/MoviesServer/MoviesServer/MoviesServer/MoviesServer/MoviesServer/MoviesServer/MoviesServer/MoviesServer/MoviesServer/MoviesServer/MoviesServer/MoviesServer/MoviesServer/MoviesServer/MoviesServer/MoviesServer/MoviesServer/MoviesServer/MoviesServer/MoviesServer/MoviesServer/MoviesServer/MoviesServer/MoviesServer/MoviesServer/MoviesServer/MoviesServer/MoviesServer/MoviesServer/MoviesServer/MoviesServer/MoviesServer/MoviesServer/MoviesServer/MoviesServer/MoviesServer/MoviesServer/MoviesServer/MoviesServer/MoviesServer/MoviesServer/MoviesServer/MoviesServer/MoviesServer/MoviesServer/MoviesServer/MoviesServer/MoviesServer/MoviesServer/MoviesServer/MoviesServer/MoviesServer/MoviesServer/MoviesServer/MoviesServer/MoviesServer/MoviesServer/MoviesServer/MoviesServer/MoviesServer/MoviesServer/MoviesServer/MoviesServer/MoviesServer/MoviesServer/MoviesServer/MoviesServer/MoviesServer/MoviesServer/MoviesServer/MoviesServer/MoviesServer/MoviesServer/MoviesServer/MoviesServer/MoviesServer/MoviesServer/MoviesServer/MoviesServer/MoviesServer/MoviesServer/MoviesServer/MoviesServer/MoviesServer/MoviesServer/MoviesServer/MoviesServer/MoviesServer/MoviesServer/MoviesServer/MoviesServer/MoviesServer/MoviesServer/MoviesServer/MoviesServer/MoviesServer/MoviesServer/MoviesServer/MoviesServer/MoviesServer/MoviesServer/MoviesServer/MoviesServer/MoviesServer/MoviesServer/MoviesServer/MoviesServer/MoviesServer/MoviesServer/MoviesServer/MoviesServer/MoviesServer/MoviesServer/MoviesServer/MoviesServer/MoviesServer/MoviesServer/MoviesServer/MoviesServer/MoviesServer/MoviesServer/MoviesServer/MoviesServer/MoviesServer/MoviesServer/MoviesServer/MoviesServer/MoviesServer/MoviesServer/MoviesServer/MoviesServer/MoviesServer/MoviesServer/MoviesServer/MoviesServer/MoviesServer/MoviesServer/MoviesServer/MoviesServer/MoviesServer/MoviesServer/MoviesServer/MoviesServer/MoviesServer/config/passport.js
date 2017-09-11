/**
 * Created by USER on 02/08/2017.
 */
var passport = require ('passport');
var LocalStrategy = require('passport-local').Strategy;
var Usuario = require ('../app/models/user');

passport.serializeUser(function(usuario,done){
  done(null,usuario._id);
})

passport.deserializeUser(function (id,done) {
  Usuario.findById(id, function (err,user) {
    done(err,user);
  })
})

passport.use(new LocalStrategy(
  {usernameField: 'username'},function (username,password,done) {
    Usuario.findOne({username},function (err,user) {
      if(!user){
        return done(null,false,{message:' Este username: ${username} no esta registrado'})
      }else{
        if(user.password == password){
          return done(null,user);
        }else{
          return done(null,false,{message: 'La contraseña no es valida'});
        }
      }
    })
  }
))

exports.estaAutenticado = function (req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }else{
    res.status(401).send('Tienes que hacer log in para acceder a este recurso');
  }
}
