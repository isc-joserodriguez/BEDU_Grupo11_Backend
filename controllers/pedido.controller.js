const mongoose = require('mongoose');  // exportacion de mongoose
const Pedido = mongoose.model('Pedido');

const crearPedido = (req, res, next) => {
  if(req.usuario.type!=="admin") return res.status(401).send("sin permisos")
  
  let pedido = new Pedido(req.body)
    pedido.save().then(pedido => {    //Guardando nuevo usuario en MongoDB.
      return res.status(201).json(pedido)
    }).catch(next);
}

/* Verbo   Ruta            Body        Respuesta 
POST    skdfljhskdlfh   {sdfadfa}   
PUT      */

//Pedido 604c33f09de26c34e254b386

const verPedido = (req, res, next) => { //envia los datos del pedido seleccionado
  Pedido.findById(req.params.id).populate('producto', 'nombre id_categoria descripcion costo').then((pedido,err) => {
    console.log('verPEd');
    if (!pedido || err) {
      return res.sendStatus(401)
    }
    return res.json(pedido);
  }).catch(next);
}

/* 
604ae551102f226520d85cb0
604ae5dc102f226520d85cb2
604ae5e5102f226520d85cb3
604ae7e0261f1367a35f216c
 */

const verHistorialPedidos = (req, res, next) => {
  let filter={};
  switch(req.usuario.type){
    case 'client':
      if(req.usuario.id !== req.params.id) return res.status(401).send('No autorizado');
      filter={client:req.params.id}
      break;
    case 'chef':
      filter={chef:req.params.id}
      break;
    case 'mesero':
      filter={mesero:req.params.id}
      break;
    }
  Pedido.find(filter).then((pedido,err) => {
    if (!pedido || err) {
      return res.sendStatus(401)
    }
    return res.json(pedido);
  }).catch(next);
}

const editarPedido = (req, res, next) => {
  let filter={};
  switch(req.usuario.type){
    case 'client':
      filter={_id:req.params.id,client:req.usuario.id}
      break;
    case 'admin':
      filter={_id:req.params.id}
      break;
    case 'chef':
      filter={_id:req.params.id,chef:req.usuario.id}
      break;
    case 'mesero':
      filter={_id:req.params.id,mesero:req.usuario.id}
      break;
    }
    let datos = req.body;
    Pedido.findOneAndUpdate(filter, { $set: datos }, { new: true }).then((pedido) => {
    if (!pedido) {
      return res.sendStatus(401)
    }
    return res.json(pedido);
  }).catch(next);
}




function cambiarEstatusPedido(req, res, next) {//-----------listo
  if(req.usuario.type!=="admin"){
    return res.status(401).send("sin permisos")
  }
  //db.collection.findOneAndUpdate({busqueda},{nuevos:datos},{new:true})
  Pedido.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true}).then(pedido => {
    if (!pedido) { return res.sendStatus(401); }
    res.status(201).json(pedido)
  }).catch(next)
}


const filtrarPedido = (req, res, next) => {

  /* 
  fechaIni
  fechaFin
  idCliente
  idPedido
  idMesero
  idChef
   */
  let campo = Object.keys(req.body)[0];//Obtiene el nombre del campo para filtrar
  let dato = req.body[campo];//Obtiene el valor por el que se va a filtrar
  let pedidos = PEDIDOS.filter((pedido) => {
    let noEncontrado = true; //Se crea una variable temporal para determinar si fue encontrado algún producto
    pedido.info_productos.forEach((producto) => { //En cada pedido, revisa los productos
      let regex = new RegExp(dato, 'gi');//Crea una expresión regular para evaluar
      noEncontrado = noEncontrado && !regex.test(producto[campo]);//Evalua el campo del producto a filtrar con la expresión regular. 
      //Se hace un AND para que con la primera iteración que encuentre, no cambie el resultado en las siguientes iteraciones
    });
    return !noEncontrado;
  });

  if (!!pedidos[0]) {//Si no encuentra ningun pedido, regresa un error
    res.status(200).send(pedidos);
  } else {
    res.status(404).send({ errorMessage: 'NotFound: Busqueda no arrojó resultados' });
  }
}

const eliminarPedido = (req, res, next) => {
  let pedidoEliminado = null; //aqu'i guardara' la info del eliminado
  let encontrado = false;

  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === +req.params.id) { //cuando encuentre el pedido acorde a su id
      if (!PEDIDOS[i].estatus) pedidoEliminado = PEDIDOS.splice(i, 1); //si el pedido est'a cancelado (estatus=0) se eliminara del arreglo y se guarda su info
      encontrado = true; //cambia bandera a encontrado
      break;
    }
  }
  if (!!pedidoEliminado) { //si hay un eliminado
    res.status(200).send(pedidoEliminado[0]); //se muestra como parte de la respuesta
  } else if (encontrado) { //fue encontrado pero no eliminado
    res
      .status(409)
      .send({
        errorMessage: 'Conflict: No se puede eliminar un pedido no cancelado',
      });
  } else { //no encontrado
    res
      .status(404)
      .send({ errorMessage: 'Not found: No se encontró el pedido' });
  }
}

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
