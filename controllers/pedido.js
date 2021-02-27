const Pedido = require('../models/Pedido')

var PEDIDOS = [
  new Pedido({
    id:1, 
    id_cliente:1, 
    info_productos:[
      {
        id:1, 
        nombre: 'Sincronizada',
        id_categoria: 1,
        descripcion: 'Sincronizada con jamón',
        estatus_disponibilidad:1,
        cantidad:1, 
        notas: 'Sin cebolla'
      },
      {
        id:3, 
        nombre: 'Hamburguesa',
        id_categoria: 2,
        descripcion: 'Hamburguesa',
        estatus_disponibilidad:1,
        cantidad:1, 
        notas: 'Sin Jitomate'
      }
    ], 
    costo:"$120", 
    estatus:1,
    fecha: new Date(1633202400000)
  }),
  new Pedido({
    id:2, 
    id_cliente:2,
    info_productos:[
      {
        id:4, 
        nombre: 'Pizza',
        id_categoria: 2,
        descripcion: 'Pizza de peperoni',
        estatus_disponibilidad:1,
        cantidad:1, 
        notas: 'Extra peperoni'
      },
      {
        id:5, 
        nombre: 'Torta',
        id_categoria: 1,
        descripcion: 'Torta de jamon',
        estatus_disponibilidad:1,
        cantidad:1, 
        notas: 'Sin Jitomate'
      }
    ], 
    costo:"$75", 
    estatus:0,
    fecha: new Date(1634087400000)
  }),
  new Pedido({
    id:3, 
    id_cliente:1,
    info_productos:[
      {
        id:5, 
        nombre: 'Pizza',
        id_categoria: 2,
        descripcion: 'Pizza de peperoni',
        estatus_disponibilidad:1,
        cantidad:1, 
        notas: 'Extra peperoni'
      },
      {
        id:1, 
        nombre: 'Sincronizada',
        id_categoria: 1,
        descripcion: 'Sincronizada con jamón',
        estatus_disponibilidad:1,
        cantidad:1, 
        notas: 'Sin cebolla'
      },
    ], 
    costo:"$90", 
    estatus:1,
    fecha: new Date(1634087400000)
  }),
];

function crearPedido(req, res) {
  // Instanciaremos una nueva categoria utilizando la clase pedido
  var pedido = new Pedido(req.body)
  PEDIDOS.push(pedido)
  res.status(201).send(pedido)
}

function verPedido(req, res) {
    let pedidoSelected = null;
    for(let i=0; i<PEDIDOS.length;i++){
        if(PEDIDOS[i].id===+req.params.id){
           pedidoSelected = PEDIDOS[i];
           break;
        }
     }
    res.send(pedidoSelected)
}

function verHistorialPedido(req, res) {
      res.status(200).send(PEDIDOS)
  }

function editarPedido(req, res) { //ver caso de objetos de productos
  // simulando una categoria previamente existente que el cliente modifica
  let {id, info_productos}= req.body; 
  let pedidoEdited = null;
  for(let i=0; i<PEDIDOS.length;i++){
     if(PEDIDOS[i].id===id){
            PEDIDOS[i].info_productos=info_productos;
            pedidoEdited = PEDIDOS[i];
            break;
     }
  }
  if(pedidoEdited){
    res.status(200).send(pedidoEdited);
  }else{ 
    res.status(404).send({errorMessage:'Not Found: Pedido no encontrado.'});
  }
}
 //aqui aplica nuestro cancelar(){}
function cambiarEstatusPedido(req, res) { //ACTIVOS=1, CANCELADOS=0
    let pedidoEdited = null;
    for(let i=0; i<PEDIDOS.length;i++){
         if(PEDIDOS[i].id===req.body.id){
            pedidoEdited = PEDIDOS[i];
            pedidoEdited.estatus = req.body.estatus;
            break;
         }
    }
    if(pedidoEdited){
        res.status(200).send(pedidoEdited);
    }
    else{
        res.status(404).send({errorMessage: "Not found"});
    }
  }

  

function filtrarPedido(req,res) {
    let campo = Object.keys(req.body)[0];
    let dato = req.body[campo];
    let pedidos = PEDIDOS.filter(pedido =>{
      let noEncontrado=true;
      pedido.info_productos.forEach(producto => {
         noEncontrado= noEncontrado && !(producto[campo]===dato);
      });
      return !noEncontrado;
    });
    if(!!pedidos[0]){
      res.status(200).send(pedidos);
    }else{
      res.status(404).send({errorMessage:'La busqueda no arrojó resultados'});
    }
}


function eliminarPedido(req, res) {
    let pedidoEliminado = null;
    let encontrado=false;
    
    for(let i=0; i<PEDIDOS.length;i++){
         if(PEDIDOS[i].id===+req.params.id){
           if(!PEDIDOS[i].estatus) pedidoEliminado=PEDIDOS.splice(i,1);
          encontrado=true;
          break;
         }
    }
    if(!!pedidoEliminado){
        res.status(200).send(pedidoEliminado[0]);
    } else if (encontrado){
      res.status(409).send({errorMessage: "Conflict: No se puede eliminar un pedido no cancelado"});
    } else{
        res.status(404).send({errorMessage: "Not found: No se encontró el pedido"});
    }
  }

// exportamos las funciones definidas
module.exports = {
  crearPedido,
  verPedido,
  verHistorialPedido,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  eliminarPedido
}

