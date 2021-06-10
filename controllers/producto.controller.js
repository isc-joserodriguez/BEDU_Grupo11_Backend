const mongoose = require('mongoose')
const Producto = mongoose.model('Producto')
const codeResponses = require('../config').codeResponses;

function crearProducto(req, res, next) {
  if (req.usuario.type !== 'admin') {
    return res.status(401).send(
      {
        ...codeResponses[401],
        message: 'Sólo el administrador puede crear un producto'
      }
    );
  }
  const producto = new Producto(req.body)
  producto.save().then(producto => {
    return res.status(201).send({
      ...codeResponses[201],
      detail: producto
    });
  }).catch(next);
}

function verProducto(req, res, next) {
  Producto.findById(req.params.id).populate('idCategoria').then((producto, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!producto) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: producto
    });
  }).catch(next);
}

function verProductos(req, res, next) {
  Producto.find().populate('idCategoria').then((productos, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (productos.length == 0) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.'
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: productos
    });
  }).catch(next);
}

function editarProducto(req, res, next) {
  delete req.body.status;
  if (req.usuario.type !== 'admin') return res.status(401).send({
    ...codeResponses[401],
    message: 'Sólo el administrador puede editar un producto'
  });
  Producto.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then((producto, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!producto) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: producto
    });
  }).catch(next);
}

function cambiarEstatusProducto(req, res, next) {
  if (req.usuario.type !== 'admin') return res.status(401).send({
    ...codeResponses[401],
    message: 'Sólo el administrador puede cambiar el estatus de un producto'
  });
  Producto.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } }, { new: true }).then((updatedProducto, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    }
    if (!updatedProducto) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: updatedProducto
    });
  }).catch(next);
}

//Filtrar productos
function filtrarProducto(req, res, next) {
  let {
    inactivo,
    activo,
    minPrice,
    maxPrice,
    nombre,
    descripcion,
    categoria
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

  //Price Management
  let priceFilter = {};
  if (!!minPrice && !!maxPrice) {
    priceFilter = {
      cost: {
        $gte: +minPrice,
        $lte: +maxPrice
      }
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

  //Category Management
  let categoryFilter = {};
  let inCategoryFilter = false;
  if (!!categoria) {
    if (mongoose.isValidObjectId(categoria) && categoria.length === 24) {
      categoryFilter = {
        idCategoria: mongoose.Types.ObjectId(categoria)
      }
    } else {
      inCategoryFilter = true;
    }
  }

  const filter = {
    $and: [
      statusFilter,
      priceFilter,
      nameFilter,
      descriptionFilter,
      categoryFilter
    ]
  }
  Producto.find(filter).populate('idCategoria').then((filteredProductos, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    }
    if (inCategoryFilter) {
      filteredProductos = filteredProductos.filter(producto => producto.idCategoria.name.toLowerCase().includes(categoria.toLowerCase()));
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: filteredProductos
    });
  }).catch(next);
}

module.exports = {
  crearProducto,
  cambiarEstatusProducto,
  editarProducto,
  verProducto,
  verProductos,
  filtrarProducto
}