const mongoose = require("mongoose"); // exportacion de mongoose
const Pedido = mongoose.model("Pedido");
const Producto = mongoose.model("Producto");

const crearPedido = (req, res, next) => {
  if (req.usuario.type !== "admin")
    return res.status(401).send({
      ...codeResponses[401],
      message: "Solo un usuario administrador puede crear un pedido"
    });

  let pedido = new Pedido(req.body);
  pedido.save().then((pedido, error) => {
    if (error)
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    return res.status(201).json({
      ...codeResponses[201],
      detail: pedido
    });
  }).catch(next);
};

const verPedido = (req, res, next) => {
  //envia los datos del pedido seleccionado
  Pedido.findById(req.params.id).then((pedido, error) => {
    if (error)
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    pedido.info.map((id) => {
      return mongoose.Types.ObjectId(id);
    });
    Producto.find({ _id: { $in: pedido.info } }).then((productos, error) => {
      if (error)
        return res.status(400).send({
          ...codeResponses[400],
          message: error
        });
      pedido.info = productos;
      return res.status(200).send({
        ...codeResponses[200],
        detail: pedido
      });
    });
  }).catch(next);
};

const verHistorialPedidos = (req, res, next) => {
  let filter = {};
  switch (req.usuario.type) {
    case "cliente":
      if (req.usuario.id !== req.params.id)
        return res.status(401).send({
          ...codeResponses[401],
          message: "Un usuario cliente solo puede ver su historial de pedidos"
        });
      filter = { idCliente: req.params.id };
      break;
    case "chef":
      filter = { idChef: req.params.id };
      break;
    case "mesero":
      filter = { idMesero: req.params.id };
      break;
  }
  Pedido.find(filter)
    .then((pedido, err) => {
      if (!pedido) {
        return res.status(404).send({
          ...codeResponses[404],
          message: "No se encontraron pedidos con esas descripciones."
        });
      } else if (err) {
        return res.status(400).send({
          ...codeResponses[400],
          message: err
        });
      }
      return res.status(200).send({
        ...codeResponses[200],
        detail: pedido
      });
    })
    .catch(next);
};

const editarPedido = (req, res, next) => {
  let filter = {};
  switch (req.usuario.type) {
    case "cliente":
      filter = { _id: req.params.id, idCliente: req.usuario.id, status: 1 };
      break;
    case "admin":
      filter = { _id: req.params.id, status: 1 };
      break;
  }
  let datos = req.body;
  Pedido.findOneAndUpdate(filter, { $set: datos }, { new: true })
    .then((pedido, error) => {
      if (!pedido) {
        return res.status(404).send({
          ...codeResponses[404],
          message: "No hay coincidencia de pedido para editar."
        });
      } else if (error) {
        return res.status(400).send({
          ...codeResponses[400],
          message: error
        });
      }
      return res.status(200).send({
        ...codeResponses[200],
        detail: pedido
      });
    })
    .catch(next);
};

function cambiarEstatusPedido(req, res, next) {
  if (req.usuario.type === "cliente")
    return res.status(401).send({
      ...codeResponses[401],
      message: "Un usuario cliente no puede cambiar el estatus de un pedido."
    });
  let filter = { _id: req.params.id };
  switch (req.usuario.type) {
    case "admin":
      if (req.body.status === 0) {
        filter.status = 1;
      }
      else if (req.body.status === 2) {
        filter.status = 1;
      }
      else if (req.body.status === 3) {
        filter.status = 2;
      }
      else if (req.body.status === 4) {
        filter.status = 3;
      }
      break;
    case "mesero":
      if (req.body.status === 2 || req.body.status === 3) {
        return res.status(401).send({
          ...codeResponses[401],
          message: "Un usuario mesero no puede cambiar el estatus de un pedido a preparando o preparado"
        });
      } else if (req.body.status === 4) {
        filter.status = 3;
      }
      break;
    case "chef":
      if (req.body.status === 4 || req.body.status === 0) {
        return res.status(401).send({
          ...codeResponses[401],
          message: "Un usuario chef no puede cambiar el estatus de un pedido a entregado"
        });
      }
      else if (req.body.status === 2) {
        filter.status = 1;
      }
      else if (req.body.status === 3) {
        filter.status = 2;
      }
      break;
  }

  //db.collection.findOneAndUpdate({busqueda},{nuevos:datos},{new:true})
  Pedido.findOneAndUpdate(filter, { $set: { status: req.body.status } }, { new: true }).then((pedido, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } if (!pedido) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "No hay coincidencias."
      });
    }
    res.status(200).json({
      ...codeResponses[200],
      detail: pedido
    });
  }).catch(next);
}

const filtrarPedido = (req, res, next) => {
  let filter = {};
  if (req.body.fechaIni || req.body.fechaFin) {
    filter.createdAt = {};
    if (req.body.fechaIni)
      filter.createdAt["$gte"] = new Date(req.body.fechaIni);
    if (req.body.fechaFin)
      filter.createdAt["$lt"] = new Date(req.body.fechaFin);
  }
  if (req.body.idCliente) filter.idCliente = mongoose.Types.ObjectId(idCliente);
  if (req.body.idPedido) filter._id = mongoose.Types.ObjectId(idPedido);
  if (req.body.idChef) filter.idChef = mongoose.Types.ObjectId(idChef);
  if (req.body.idMesero) filter.idMesero = mongoose.Types.ObjectId(idMesero);

  Pedido.find(filter).then((pedidos, error) => {
    if (error)
      return res.status(400).json({
        ...codeResponses[400],
        message: error
      });
    return res.status(200).json({
      ...codeResponses[200],
      detail: pedidos
    });
  }).catch(next);
};


const eliminarPedido = (req, res, next) => {
  if (req.usuario.type !== "admin") {
    return res.status(401).send({
      ...codeResponses[401],
      message: "Solo un administrador eliminar un pedido"
    });
  }
  Pedido.findOneAndDelete({ _id: req.params.id, status: 0 }).then((pedido, error) => { //Elimina sólo los cancelados
    if (error)
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
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
  verHistorialPedidos,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  eliminarPedido,
};