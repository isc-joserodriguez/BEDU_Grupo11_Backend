const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const passport = require('passport');
const codeResponses = require('../config').codeResponses;

const registrarse = (req, res, next) => {
  if (req.body.type) {
    if (req.usuario) {
      if (req.usuario.type !== 'admin')
        return res.status(401).send({
          ...codeResponses[401],
          message: `Sólo el administrador puede crear un nuevo ${req.body.type}.`
        });
    } else if (req.body.type !== 'cliente') {
      return res.status(401).send({
        ...codeResponses[401],
        message: 'No puedes realizar esta acción.'
      });
    }
  }
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
    if (err) return next(err);

    if (!user) return res.status(400).send(
      {
        ...codeResponses[400],
        message: info.errors
      }
    );

    if (!user._doc.status) return res.status(403).send(
      {
        ...codeResponses[403],
        message: 'Usuario desactivado'
      }
    );
    return res.status(200).send(
      {
        ...codeResponses[200],
        detail: { ...user._doc, token: user.generarJWT() }
      }
    );
  })(req, res, next);
}

const verUsuarios = (req, res, next) => {
  if (req.usuario.type === 'cliente')
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Un usuario cliente no puede ver el listado de usuarios del sistema'
    });
  Usuario.find().then((users, err) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    else if (err) {
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
  if (req.usuario.type === 'cliente' && req.usuario.id !== req.params.id)
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Un usuario no puede ver los datos de otro usuario'
    });
  Usuario.findById(req.params.id).then((user, err) => {
    if (!user) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    else if (err) {
      return res.status(400).send({
        ...codeResponses[400],
        message: err
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: user
    });
  }).catch(next);
};

const filtrar = (req, res, next) => {
  if (req.usuario.type === 'cliente')
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Un usuario cliente no puede realizar un filtrado en el listado de usuarios del sistema'
    });

  let {
    inactivo,
    activo,
    admin,
    chef,
    mesero,
    cliente,
    nombre,
    apellido,
    mail
  } = req.body;

  const status = [];
  if (inactivo) status.push(0);
  if (activo) status.push(1);

  let statusFilter = {};
  if (!!status.length) {
    statusFilter = {
      $or: status.map(status => ({ status }))
    }
  }

  // Type Management
  const type = [];
  if (admin) type.push('admin');
  if (chef) type.push('chef');
  if (mesero) type.push('mesero');
  if (cliente) type.push('cliente');

  let typeFilter = {};
  if (!!type.length) {
    typeFilter = {
      $or: type.map(type => ({ type }))
    }
  }

  //Name Management
  let nameFilter = {};
  if (!!nombre) {
    nameFilter = { firstName: new RegExp(`${nombre}`, 'i') };
  }

  //Lastname Management
  let lastnameFilter = {};
  if (!!apellido) {
    lastnameFilter = { lastName: new RegExp(`${apellido}`, 'i') };
  }

  //Mail Management
  let mailFilter = {};
  if (!!mail) {
    mailFilter = { email: new RegExp(`${mail}`, 'i') };
  }

  const filter = {
    $and: [
      statusFilter,
      typeFilter,
      nameFilter,
      lastnameFilter,
      mailFilter
    ]
  }
  Usuario.find(filter).then((filteredUsuarios, err) => {
    if (err) {
      return res.status(400).send({
        ...codeResponses[400],
        message: err
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: filteredUsuarios
    });
  }).catch(next);
};

const editar = (req, res, next) => {
  if (req.usuario.type !== 'admin' && req.usuario.id !== req.params.id) return res.status(401).send({
    ...codeResponses[401],
    message: 'Sólo puedes editar tus datos de usuario'
  });
  if (req.usuario.type !== 'admin') {
    delete req.body.type;
    delete req.body.status;
  }
  if (req.body.password) {
    let newUsuario = req.body;
    let { password } = req.body;

    delete newUsuario.password
    const usuario = new Usuario(newUsuario);
    usuario.hashPassword(password)
    req.body.hash = usuario.hash;
    req.body.salt = usuario.salt;
  }
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then((user, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!user) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: user
    });
  }).catch(next);
};

const cambiarRol = (req, res, next) => {
  if (req.usuario.type !== 'admin')
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Sólo un administrador puede cambiar el rol de otro usuario'
    });
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: { type: req.body.type } }, { new: true }).then((users) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: users
    });
  }).catch(next);
};

const cambiarEstatus = (req, res, next) => {
  if (req.usuario.type !== 'admin')
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Sólo el administrador puede hacer esta acción'
    });
  Usuario.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } }, { new: true }).then((users) => {
    if (!users) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
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
