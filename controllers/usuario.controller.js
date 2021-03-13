const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const passport = require('passport');

const registrarse = (req, res, next) => {
  let newUsuario = req.body;
  let { password } = req.body;

  delete newUsuario.password
  const usuario = new Usuario(newUsuario)
  usuario.hashPassword(password)

  usuario.save().then(user => {
    return res.status(201).json(user.toAuthJSON())
  }).catch(next)
};

const iniciarSesion = (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: 'no puede estar vacío' } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: 'no puede estar vacío' } });
  }
  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generarJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
}

const verUsuarios = (req, res, next) => {
  if (req.usuario.type === 'cliente') res.status(401).send('No autorizado');
  Usuario.find().then((users, err) => {
    if (!users || err) {
      return res.sendStatus(401)
    }
    return res.json(users);
  }).catch(next);
};

const verUsuario = (req, res, next) => {
  if (req.usuario.type === 'cliente' && req.usuario.id !== req.params.id) res.status(401).send('No autorizado');
  Usuario.findById(req.params.id).then((user, err) => {
    if (!user || err) {
      return res.sendStatus(401)
    }
    return res.json(user);
  }).catch(next);
};

const filtrar = (req, res, next) => {
  if (req.usuario.type === 'cliente') res.status(401).send('No autorizado');
  let campo = Object.keys(req.body)[0]; //Obtiene el nombre del campo para filtrar
  let valor = req.body[campo];//Obtiene el valor por el que se va a filtrar
  let filter = {}
  filter[campo] = new RegExp(`${valor}`, 'i');
  Usuario.find(filter).then((users, err) => {
    if (!users || err) {
      return res.sendStatus(401)
    }
    return res.json(users);
  }).catch(next);
};

const editar = (req, res, next) => {
  if (req.usuario.type === 'cliente' && req.usuario.id !== req.params.id) res.status(401).send('No autorizado');
  let datos = req.body;
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: datos }, { new: true }).then((users) => {
    if (!users) {
      return res.sendStatus(401)
    }
    return res.json(users);
  }).catch(next);
};

const cambiarRol = (req, res, next) => {
  if (req.usuario.type !== 'admin') res.status(401).send('No autorizado');
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: { type: req.body.type } }, { new: true }).then((users) => {
    if (!users) {
      return res.sendStatus(401)
    }
    return res.json(users);
  }).catch(next);
};

const cambiarEstatus = (req, res, next) => {
  //if (req.usuario.type !== 'admin') res.status(401).send('No autorizado');
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } }, { new: true }).then((users) => {
    if (!users) {
      return res.sendStatus(401)
    }
    return res.json(users);
  }).catch(next);
};

//Exportar métodos
module.exports = {
  iniciarSesion,
  registrarse,
  verUsuarios,
  verUsuario,
  filtrar,
  editar,
  cambiarRol,
  cambiarEstatus,
};
