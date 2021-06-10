// controllers/categoria.js
const mongoose = require('mongoose');
const Categoria = mongoose.model('Categoria');
const codeResponses = require('../config').codeResponses;

//--------------------------------------------------------------------
const crearCategoria = (req, res, next) => {
  if (req.usuario.type !== 'admin')
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Sólo el administrador puede crear una nueva categoría'
    });
  let categoria = new Categoria(req.body);
  categoria.save().then((categoria, error) => {
    if (error) return res.status(400).send({
      ...codeResponses[400],
      message: error
    });
    return res.status(201).send({
      ...codeResponses[201],
      detail: categoria
    });
  }).catch(next);
}

function verCategoria(req, res, next) { //Obteniendo categoria desde MongoDB.
  if (req.usuario.type === 'chef') {
    return res.status(401).send({
      ...codeResponses[401],
      message: 'No puedes ver esta opción.'
    });
  }
  Categoria.findById(req.params.id).then((categoria, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!categoria) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: categoria
    });
  }).catch(next);
}


function verCategorias(req, res, next) {
  if (req.usuario.type === 'chef') {
    return res.status(401).send(
      {
        ...codeResponses[401],
        message: 'No puedes ver esta opción.'
      }
    );
  }
  Categoria.find().then((categorias, error) => { //Obteniendo categorias desde MongoDB.
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (categorias.length === 0) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: categorias
    });
  }).catch(next);
}

function editarCategoria(req, res, next) {
  delete req.body.status;
  if (req.usuario.type !== 'admin') {
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Sólo el administrador puede editar una categoría.'
    });
  }
  Categoria.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then((updatedCategoria, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!updatedCategoria) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: updatedCategoria
    });
  }).catch(next);
}
function cambiarEstatusCategoria(req, res, next) {
  if (req.usuario.type !== 'admin') {
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Sólo el administrador puede editar una categoría.'
    });
  }
  Categoria.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } }, { new: true }).then((updatedCategoria, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!updatedCategoria) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: updatedCategoria
    });
  }).catch(next);
}

function filtrarCategoria(req, res, next) {
  if (req.usuario.type === 'chef') {
    return res.status(401).send({
      ...codeResponses[401],
      message: 'No puedes ver esta opción.'
    });
  }
  let {
    inactivo,
    activo,
    nombre,
    descripcion
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

  //Name Management
  let nameFilter = {};
  if (!!nombre) {
    nameFilter = { name: new RegExp(`${nombre}`, 'i') };
  }

  //Description Management
  let descriptionFilter = {};
  if (!!descripcion) {
    descriptionFilter = { description: new RegExp(`${descripcion}`, 'i') };
  }

  const filter = {
    $and: [
      statusFilter,
      nameFilter,
      descriptionFilter
    ]
  }

  Categoria.find(filter).then((filteredCategorias, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: filteredCategorias
    });
  }).catch(next);
}

// exportamos las funciones definidas
module.exports = {
  crearCategoria,
  verCategorias,
  verCategoria,
  editarCategoria,
  cambiarEstatusCategoria,
  filtrarCategoria
}

