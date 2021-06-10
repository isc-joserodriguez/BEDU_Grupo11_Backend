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
  const filters = {
    'cliente': { idCliente: req.usuario.id },
    'chef': { idChef: req.usuario.id },
    'mesero': { idMesero: req.usuario.id }
  }
  let filter = filters[req.usuario.type];

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
  const filters = {
    'cliente': { _id: req.params.id, idCliente: req.usuario.id, status: 1 },
    'admin': { _id: req.params.id, status: 1 }
  }
  let filter = filters[req.usuario.type];

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

const verPedidoProcesando = (req, res, next) => {
  const actions = {
    'chef': { $and: [{ idChef: req.usuario.id }, { status: { $ne: 4 } }, { status: { $ne: 3 } }] },
    'cliente': { $and: [{ idCliente: req.usuario.id }, { status: { $ne: 4 } }, { status: { $ne: 0 } }] }
  }
  Pedido.find(actions[req.usuario.type]).populate('idCliente').populate('idChef').populate('idMesero').populate({
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
    } else if (!!pedidos.lenght) {
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

const verPedidosPropios = (req, res, next) => {
  const actions = {
    'chef': { idChef: req.usuario.id },
    'mesero': { idMesero: req.usuario.id },
    'cliente': { idCliente: req.usuario.id },
    'admin': {},
  }

  Pedido.find(actions[req.usuario.type]).populate('idCliente').populate('idChef').populate('idMesero').populate({
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
    } else if (!!pedidos.lenght) {
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

const verPendientes = (req, res, next) => {
  const actions = {
    'admin': { $and: [{ status: { $ne: 4 } }, { status: { $ne: 0 } }] },
    'chef': { idChef: null, status: 1 },
    'mesero': { idMesero: null, status: 3 }
  }
  Pedido.find(actions[req.usuario.type]).populate('idCliente').populate('idChef').populate('idMesero').populate({
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
    } else if (!!pedidos.lenght) {
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

const filtrarPedido = (req, res, next) => {
  /* req.usuario.type */
  let {
    cancelado,
    pendiente,
    preparando,
    preparado,
    entregado,
    minDate,
    maxDate,
    minPrice,
    maxPrice,
    platillo,
    chef,
    mesero,
    cliente,
  } = req.body;
  const status = [];

  //Status Management

  if (cancelado) status.push(0);
  if (pendiente) status.push(1);
  if (preparando) status.push(2);
  if (preparado) status.push(3);
  if (entregado) status.push(4);
  let statusFilter = {};
  if (!!status.length) {
    statusFilter = {
      $or: status.map(status => ({ status }))
    }
  }

  //Date Management
  let dateFilter = {};
  if (!!minDate && !!maxDate) {
    minDate = new Date(minDate);
    maxDate = new Date(maxDate);
    minDate.setDate(minDate.getDate() - 1);
    dateFilter = {
      createdAt: {
        $gte: minDate,
        $lt: maxDate
      }
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

  //Chef Management
  let chefFilter = {};
  let inChefFilter = false;
  if (!!chef) {
    if (mongoose.isValidObjectId(chef) && chef.length === 24) {
      chefFilter = {
        idChef: mongoose.Types.ObjectId(chef)
      }
    } else {
      inChefFilter = true;
    }
  }

  let clienteFilter = {};
  let inClienteFilter = false;
  if (!!cliente) {
    if (mongoose.isValidObjectId(cliente) && cliente.length === 24) {
      clienteFilter = {
        idCliente: mongoose.Types.ObjectId(cliente)
      }
    } else {
      inClienteFilter = true;
    }
  }

  let meseroFilter = {};
  let inMeseroFilter = false;
  if (!!mesero) {
    if (mongoose.isValidObjectId(mesero) && mesero.length === 24) {
      meseroFilter = {
        idMesero: mongoose.Types.ObjectId(mesero)
      }
    } else {
      inMeseroFilter = true;
    }
  }

  let inPlatilloFilter = false;
  if (!!platillo) {
    inPlatilloFilter = true;
  }

  const filter = {
    $and: [
      statusFilter,
      dateFilter,
      priceFilter,
      chefFilter,
      clienteFilter,
      meseroFilter
    ]
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
    }
    pedidos = pedidos.filter((pedido, index) => {
      let flag = true;
      if (!!inChefFilter) {
        if (!!!pedido.idChef) {
          flag = false;
        } else {
          if (chef.split(' ').length === 2) {
            flag = flag && (((`${pedido.idChef.firstName} ${pedido.idChef.lastName}`).toLowerCase()).includes(chef.toLowerCase()))
          } else {
            flag = flag && (((pedido.idChef.firstName).toLowerCase()).includes(chef.toLowerCase()) || ((pedido.idChef.lastName).toLowerCase()).includes(chef.toLowerCase()))
          }
        }
      }
      if (!!inClienteFilter) {
        if (!!!pedido.idCliente) {
          flag = false;
        } else {
          if (cliente.split(' ').length === 2) {
            flag = flag && (((`${pedido.idCliente.firstName} ${pedido.idCliente.lastName}`).toLowerCase()).includes(cliente.toLowerCase()))
          } else {
            flag = flag && (((pedido.idCliente.firstName).toLowerCase()).includes(cliente.toLowerCase()) || ((pedido.idCliente.lastName).toLowerCase()).includes(cliente.toLowerCase()))
          }
        }
      }
      if (!!inMeseroFilter) {
        if (!!!pedido.idMesero) {
          flag = false;
        } else {
          if (mesero.split(' ').length === 2) {
            flag = flag && (((`${pedido.idMesero.firstName} ${pedido.idMesero.lastName}`).toLowerCase()).includes(mesero.toLowerCase()))
          } else {
            flag = flag && (((pedido.idMesero.firstName).toLowerCase()).includes(mesero.toLowerCase()) || ((pedido.idMesero.lastName).toLowerCase()).includes(mesero.toLowerCase()))
          }
        }
      }
      if (inPlatilloFilter) {
        flag = flag && pedido.info
          .map(producto => (producto.name.toLowerCase()).includes(platillo.toLowerCase()))
          .reduce((act, nxt) => (act || nxt), false)
      }
      return flag;
    })

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
  verPedidoProcesando,
  verPedidosPropios,
  verPendientes
};