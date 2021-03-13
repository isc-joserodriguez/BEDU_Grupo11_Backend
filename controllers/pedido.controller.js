const mongoose = require("mongoose"); // exportacion de mongoose
const Pedido = mongoose.model("Pedido");
const Producto = mongoose.model("Producto");

const crearPedido = (req, res, next) => {
  if (req.usuario.type !== "admin") return res.status(401).send("sin permisos");

  let pedido = new Pedido(req.body);
  pedido
    .save()
    .then((pedido) => {
      //Guardando nuevo usuario en MongoDB.
      return res.status(201).json(pedido);
    })
    .catch(next);
};

const verPedido = (req, res, next) => {
  //envia los datos del pedido seleccionado
  Pedido.findById(req.params.id)
    .then((pedido, err) => {
      pedido.info.map((id) => {
        return mongoose.Types.ObjectId(id);
      });
      Producto.find({ _id: { $in: pedido.info } }).then((prods) => {
        pedido.info = prods;
        return res.json(pedido);
      });
    })
    .catch(next);
};

const verHistorialPedidos = (req, res, next) => {
  let filter = {};
  switch (req.usuario.type) {
    case "client":
      if (req.usuario.id !== req.params.id)
        return res.status(401).send("No autorizado");
      filter = { client: req.params.id };
      break;
    case "chef":
      filter = { chef: req.params.id };
      break;
    case "mesero":
      filter = { mesero: req.params.id };
      break;
  }
  Pedido.find(filter)
    .then((pedido, err) => {
      if (!pedido || err) {
        return res.sendStatus(401);
      }
      return res.json(pedido);
    })
    .catch(next);
};

const editarPedido = (req, res, next) => {
  let filter = {};
  switch (req.usuario.type) {
    case "client":
      filter = { _id: req.params.id, client: req.usuario.id };
      break;
    case "admin":
      filter = { _id: req.params.id };
      break;
    case "chef":
      filter = { _id: req.params.id, $or: [{ chef: req.usuario.id }, { chef: null }] }; //Null o idPropio
      break;
    case "mesero":
      filter = { _id: req.params.id, $or: [{ mesero: req.usuario.id }, { mesero: null }] }; //Null o idPropio
      break;
  }
  let datos = req.body;
  Pedido.findOneAndUpdate(filter, { $set: datos }, { new: true })
    .then((pedido) => {
      if (!pedido) {
        return res.sendStatus(401);
      }
      return res.json(pedido);
    })
    .catch(next);
};

function cambiarEstatusPedido(req, res, next) { //pendiente
  if (req.usuario.type !== "admin") {
    return res.status(401).send("sin permisos");
  }
  //db.collection.findOneAndUpdate({busqueda},{nuevos:datos},{new:true})
  Pedido.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then((pedido) => {
      if (!pedido) {
        return res.sendStatus(401);
      }
      res.status(201).json(pedido);
    })
    .catch(next);
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
  if (req.body.idCliente) filter.client = mongoose.Types.ObjectId(idCliente);
  if (req.body.idPedido) filter._id = mongoose.Types.ObjectId(idPedido);
  if (req.body.idChef) filter.chef = mongoose.Types.ObjectId(idChef);
  if (req.body.idMesero) filter.mesero = mongoose.Types.ObjectId(idMesero);

  Pedido.find(filter).then((pedidos, err) => {
    return res.send(pedidos);
  });
};

const eliminarPedido = (req, res, next) => {
  if (req.usuario.type !== "admin") {
    return res.status(401).send("sin permisos");
  }
  Pedido.findOneAndDelete({ _id: req.params.id, status: 0 }).then(pedido => { //Elimina sólo los cancelados
    //Buscando y eliminando pedido en MongoDB.
    res.status(200).send(`Pedido ${req.params.id} eliminado: ${pedido}`);
  });

  /*
  let pedidoEliminado = null; //aqu'i guardara' la info del eliminado
  let encontrado = false;

  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === +req.params.id) {
      //cuando encuentre el pedido acorde a su id
      if (!PEDIDOS[i].estatus) pedidoEliminado = PEDIDOS.splice(i, 1); //si el pedido est'a cancelado (estatus=0) se eliminara del arreglo y se guarda su info
      encontrado = true; //cambia bandera a encontrado
      break;
    }
  }
  if (!!pedidoEliminado) {
    //si hay un eliminado
    res.status(200).send(pedidoEliminado[0]); //se muestra como parte de la respuesta
  } else if (encontrado) {
    //fue encontrado pero no eliminado
    res.status(409).send({
      errorMessage: "Conflict: No se puede eliminar un pedido no cancelado",
    });
  } else {
    //no encontrado
    res
      .status(404)
      .send({ errorMessage: "Not found: No se encontró el pedido" });
  }*/
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
