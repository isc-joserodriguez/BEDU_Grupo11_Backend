const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
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

//

const verUsuarios = (req, res) => { //Regresa todos los usuarios
  res.status(200).send(USUARIOS);
};

const verUsuario = (req, res) => {
  let { id } = req.params;
  let user = USUARIOS.filter((usuario) => usuario.id === +id); //Filtra al usuario con cierto id
  if (!!user[0]) {
    res.status(200).send(user[0]);
  } else {
    res.status(400).send({ errorMessage: 'Not Found: No existe el usuario' });
  }
};

const filtrar = (req, res) => {
  let campo = Object.keys(req.body)[0]; //Obtiene el nombre del campo para filtrar
  let valor = req.body[campo];//Obtiene el valor por el que se va a filtrar
  let users = USUARIOS.filter((user) => {
    let regex = new RegExp(valor, 'gi'); //Crea una expresión regular para evaluar
    return regex.test(user[campo]);//Evalua el campo del usuario a filtrar con la expresión regular
  });

  if (!!users[0]) {//Si no encuentra ningun usuario, regresa un error
    res.status(200).send(users);
  } else {
    res.status(404).send({ errorMessage: 'NotFound: Busqueda no arrojó resultados' });
  }
};

const editar = (req, res) => {
  let datos = req.body;
  let userEdited = null;
  for (let i = 0; i < USUARIOS.length; i++) {
    if (USUARIOS[i].id === +datos.id) {//Busca el usuario por id
      for (campo in datos) { //Se hace un for in para obtener cada campo del body
        USUARIOS[i][campo] = datos[campo]; //Se hace el cambio en el array por cada campo que reciba el body
        userEdited = USUARIOS[i]; //Asignamos el nuevo Array para validar al final
      }
      break; //Una vez encontrado, salimos del for
    }
  }

  if (!!userEdited) { //Si se editó, se regresa envía el registro nuevo. Si no, manda error
    res.status(200).send(userEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: 'Not Found: No se encontró al usuario' });
  }
};

const cambiarRol = (req, res) => {
  let { id, tipo } = req.body;
  let userEdited = null;
  for (let i = 0; i < USUARIOS.length; i++) { //Busca el usuario
    if (USUARIOS[i].id === id) {
      USUARIOS[i].tipo = tipo; //Se le asigna el nuevo valor
      userEdited = USUARIOS[i]; //Se guarda para validar después
      break;
    }
  }
  if (!!userEdited) { //Si se editó se regresa el nuevo registro, si no regresa un error.
    res.status(200).send(userEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: 'Not Found: No se encontró al usuario' });
  }
};

const cambiarEstatus = (req, res) => {
  let userEdited = null;
  let { id, estatus } = req.body;
  for (let i = 0; i < USUARIOS.length; i++) {//Busca el usuario
    if (USUARIOS[i].id === id) {
      USUARIOS[i].estatus = estatus;//Se le asigna el nuevo valor
      userEdited = USUARIOS[i];//Se guarda para validar después
      break;
    }
  }
  if (!!userEdited) {//Si se editó se regresa el nuevo registro, si no regresa un error.
    res.status(200).send(userEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: 'Not Found: No se encontró al usuario' });
  }
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
