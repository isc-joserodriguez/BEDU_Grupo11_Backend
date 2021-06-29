const passport = require('passport');                       //Importando passport, middleware para autenticación.
const LocalStrategy = require('passport-local').Strategy;   //Importando estrategia autenticación. --> passport-local
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({                            //Configurando elementos utilizados para habilitar sesión.
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  Usuario.findOne({ email: email }).then(function (user) {
    if (!user || !user.validatePassword(password)) {
      return done(null, false, { errors: 'Email o contraseña equivocada' });
    }
    return done(null, user);
  }).catch(done);
}));
