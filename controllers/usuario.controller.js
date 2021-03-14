const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const passport = require('passport');
const codeResponses = require("../config").codeResponses;

const registrarse = (req, res, next) => {
  let newUsuario = req.body;
  let { password } = req.body; 

  delete newUsuario.password
  const usuario = new Usuario(newUsuario)
  usuario.hashPassword(password)

  usuario.save().then(user => {
    return res.status(201).send({
      ...codeResponses[201],
      detail: user.toAuthJSON()
    })
  }).catch(next);
};

const iniciarSesion = (req, res, next) => {
  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generarJWT();
      return res.status(200).send(
        {
          ...codeResponses[200],
          detail: user
        }
      );
    } else {
      return res.status(400).send(
        {
          ...codeResponses[400],
          message: info.errors
        }
      );
    }
  })(req, res, next);
}

const verUsuarios = (req, res, next) => {
  if (req.usuario.type === 'cliente') res.status(401).send({
    ...codeResponses[401],
    message: "Un usuario cliente no puede ver el listado de usuarios del sistema"
  });
  Usuario.find().then((users, err) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "Usuario no encontrado"
      });
    }
    else if(err){
      return res.status(400).send({
        ...codeResponses[400],
        message: err
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: users
    });
  }).catch(next);
};

const verUsuario = (req, res, next) => {
  if (req.usuario.type === 'cliente' && req.usuario.id !== req.params.id) res.status(401).send({
    ...codeResponses[401],
    message: "Un usuario no puede ver los datos de otro usuario"
  });
  Usuario.findById(req.params.id).then((user, err) => {
    if (!user) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "Usuario no encontrado"
      });
    }
    else if(err){
      return res.status(400).send({
        ...codeResponses[400],
        message: err
      });
    }
    return resstatus(200).send({
      ...codeResponses[200],
      detail: user
    });
  }).catch(next);
};

const filtrar = (req, res, next) => {
  if (req.usuario.type === 'cliente') res.status(401).send({
    ...codeResponses[401],
    message: "Un usuario cliente no puede realizar un filtrado en el listado de usuarios del sistema"
  });
  let campo = Object.keys(req.body)[0]; //Obtiene el name del campo para filtrar
  let valor = req.body[campo];//Obtiene el valor por el que se va a filtrar
  let filter = {}
  filter[campo] = new RegExp(`${valor}`, 'i');
  Usuario.find(filter).then((users, err) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "Usuario no encontrado"
      });
    }
    else if(err){
      return res.status(400).send({
        ...codeResponses[400],
        message: err
      });
    }
    return resstatus(200).send({
      ...codeResponses[200],
      detail: users
    });
  }).catch(next);
};

const editar = (req, res, next) => {
  if (req.usuario.type === 'cliente' && req.usuario.id !== req.params.id) res.status(401).send({
    ...codeResponses[401],
    message: "Un usuario cliente no puede editar los datos de otro usuario del sistema"
  });
  let datos = req.body;
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: datos }, { new: true }).then((users) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "Usuario no encontrado"
      });
    }
    return resstatus(200).send({
      ...codeResponses[200],
      detail: users
    });
  }).catch(next);
};

const cambiarRol = (req, res, next) => {
  if (req.usuario.type !== 'admin') res.status(401).send({
    ...codeResponses[401],
    message: "Solo un administrador puede cambiar el rol de otro usuario"
  });
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: { type: req.body.type } }, { new: true }).then((users) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "Usuario no encontrado"
      });
    }
    return resstatus(200).send({
      ...codeResponses[200],
      detail: users
    });
  }).catch(next);
};

const cambiarEstatus = (req, res, next) => {
  //if (req.usuario.type !== 'admin') res.status(401).send('No autorizado');
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } }, { new: true }).then((users) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "Usuario no encontrado"
      });
    }
    return resstatus(200).send({
      ...codeResponses[200],
      detail: users
    });
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
