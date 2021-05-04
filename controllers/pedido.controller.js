const mongoose = require('mongoose'); // exportacion de mongoose
const Pedido = mongoose.model('Pedido');
const codeResponses = require('../config').codeResponses;

const crearPedido = (req, res, next) => {
  if (req.usuario.type === 'chef' || req.usuario.type === 'mesero') return res.status(401).send({
    ...codeResponses[401],
    message: 'No puedes crear un pedido.'
  });
  if (req.usuario.type === 'cliente') req.body.idCliente = req.usuario.id;
  let pedido = new Pedido(req.body);
  pedido.save().then((pedido, error) => {
    if (error) return res.status(400).send({
      ...codeResponses[400],
      message: error
    });
    return res.status(201).send({
      ...codeResponses[201],
      detail: pedido
    });
  }).catch(next);
};

const verPedido = (req, res, next) => {
  Pedido.findById(req.params.id).populate('idCliente').populate('idChef').populate('idMesero').populate({
    path: 'info',
    populate: {
      path: 'idCategoria'
    }
  }).then((pedido, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!pedido) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: pedido
    });
  }).catch(next);
};

const verPedidos = (req, res, next) => {
  let filter = {};
  switch (req.usuario.type) {
    case 'cliente':
      filter = { idCliente: req.usuario.id };
      break;
    case 'chef':
      filter = { idChef: req.usuario.id };
      break;
    case 'mesero':
      filter = { idMesero: req.usuario.id };
      break;
  }
  Pedido.find(filter).populate('idCliente').populate('idChef').populate('idMesero').populate({
    path: 'info',
    populate: {
      path: 'idCategoria'
    }
  }).then((filteredPedidos, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (filteredPedidos.length === 0) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: filteredPedidos
    });
  }).catch(next);
};

const editarPedido = (req, res, next) => {
  delete req.body.status;
  let filter = {};
  switch (req.usuario.type) {
    case 'cliente':
      filter = { _id: req.params.id, idCliente: req.usuario.id, status: 1 };
      break;
    case 'admin':
      filter = { _id: req.params.id, status: 1 };
      break;
  }
  let datos = req.body;
  Pedido.findOneAndUpdate(filter, { $set: datos }, { new: true }).then((editedPedido, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!editedPedido) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: editedPedido
    });
  }).catch(next);
};

function cambiarEstatusPedido(req, res, next) {
  if (req.usuario.type === 'cliente' && req.body.status !== 0) return res.status(401).send({
    ...codeResponses[401],
    message: 'Un usuario cliente no puede cambiar el estatus de un pedido.'
  });
  let filter = { _id: req.params.id };
  let edit = {};
  switch (req.usuario.type) {
    case 'admin':
      if (req.body.status === 0 || req.body.status === 2) {
        filter.status = 1;
        edit = { $set: { status: req.body.status } };
      } else if (req.body.status === 3) {
        filter.status = 2;
        edit = { $set: { status: req.body.status } };
      } else if (req.body.status === 4) {
        filter.status = 3;
        edit = { $set: { status: req.body.status } };
      }
      break;
    case 'mesero':
      if (req.body.status === 2 || req.body.status === 3) {
        return res.status(401).send({
          ...codeResponses[401],
          message: 'Un usuario mesero no puede cambiar el estatus de un pedido a preparando o preparado'
        });
      } else if (req.body.status === 4) {
        filter.status = 3;
        edit = { $set: { status: req.body.status, idMesero: req.usuario.id } };
      }
      break;
    case 'chef':
      if (req.body.status === 4 || req.body.status === 0) {
        return res.status(401).send({
          ...codeResponses[401],
          message: 'Un usuario chef no puede cambiar el estatus de un pedido a entregado o cancelado.'
        });
      } else if (req.body.status === 2) {
        filter.status = 1;
        edit = { $set: { status: req.body.status, idChef: req.usuario.id } };
      } else if (req.body.status === 3) {
        filter.status = 2;
        filter.idChef = req.usuario.id
        edit = { $set: { status: req.body.status, idChef: req.usuario.id } };
      }
      break;
    default:
      filter.status = 1;
      edit = { $set: { status: req.body.status } };
      break;
  }

  Pedido.findOneAndUpdate(filter, edit, { new: true }).populate('idCliente').populate('idChef').populate('idMesero').populate({
    path: 'info',
    populate: {
      path: 'idCategoria'
    }
  }).then((pedido, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!pedido) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: pedido
    });
  }).catch(next);
}

const filtrarPedido = (req, res, next) => {
  let filter = {};
  let { special } = req.body;
  if (req.usuario.type === 'cliente') {
    filter.idCliente = req.usuario.id
  }
  if (req.body.fechaIni || req.body.fechaFin) {
    filter.createdAt = {};
    if (req.body.fechaIni) filter.createdAt['$gte'] = new Date(req.body.fechaIni);
    if (req.body.fechaFin) filter.createdAt['$lt'] = new Date(req.body.fechaFin);
  }
  if (req.body.idCliente) filter.idCliente = mongoose.Types.ObjectId(idCliente);
  if (req.body.idChef) filter.idChef = mongoose.Types.ObjectId(idChef);
  if (req.body.idMesero) filter.idMesero = mongoose.Types.ObjectId(idMesero);
  if ((req.body.status || req.body.status === 0) && (req.body.status !== -1)) filter.status = req.body.status;
  if (req.body.cost || req.body.cost === 0) filter.cost = req.body.cost;

  if (special) {
    if (req.usuario.type === 'chef') {
      filter = {
        $or: [
          { idChef: req.usuario.id },
          { ...filter, idChef: null }
        ]
      }
    }

    if (req.usuario.type === 'mesero') {
      filter = {
        $or: [
          { idMesero: req.usuario.id },
          { ...filter, idMesero: null, status: 3 }
        ]
      }
    }
  }
  if (req.body.status === -1) {
    if (req.usuario.type === 'admin') {
      filter = { $and: [{ status: { $ne: 4 } }, { status: { $ne: 0 } }] }
    } else if (req.usuario.type === 'chef') {
      filter = { $and: [{ idChef: req.usuario.id }, { status: { $ne: 4 } }, { status: { $ne: 3 } }] }
    } else if (req.usuario.type === 'mesero') {
      filter = { $and: [{ idMesero: req.usuario.id }, { status: { $ne: 4 } }] }
    }else if (req.usuario.type === 'cliente') {
      filter = { $and: [{ idCliente: req.usuario.id }, { status: { $ne: 4 } }, { status: { $ne: 0 } }] }
    }
  }
  Pedido.find(filter).populate('idCliente').populate('idChef').populate('idMesero').populate({
    path: 'info',
    populate: {
      path: 'idCategoria'
    }
  }).then((pedidos, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (pedidos.lenght === 0) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: pedidos
    });
  }).catch(next);
};

const eliminarPedido = (req, res, next) => {
  if (req.usuario.type !== 'admin') {
    return res.status(401).send({
      ...codeResponses[401],
      message: 'Solo un administrador eliminar un pedido'
    });
  }
  Pedido.findOneAndDelete({ _id: req.params.id, status: 0 }).then((pedido, error) => { //Elimina sólo los cancelados
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!pedido) {
      return res.status(404).send({
        ...codeResponses[404],
        message: 'La consulta no arrojó resultados.',
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: pedido
    });
  }).catch(next);
};

// exportamos las funciones definidas
module.exports = {
  crearPedido,
  verPedido,
  verPedidos,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  eliminarPedido,
};