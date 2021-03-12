// importamos el modelo de pedido
const { Pedido } = require('../models');

const crearPedido = (req, res) => {
  // Instanciaremos un nuevo pedido utilizando la clase pedido
  let pedido = new Pedido(req.body);
  if (!!pedido.id) { //Validar si el nuevo pedido tiene id
    PEDIDOS.push(pedido); //agregar al arreglo
    res.status(201).send(pedido); //enviarlo como respuesta al ser exitosa la llamada
  } else {
    res
      .status(304)
      .send({ Message: 'Not Modified: No se agregó producto vacío' }); //ya que no se pueden agregar vacios se envia al siguiente mensaje
  }
}

const verPedido = (req, res) => { //envia los datos del pedido seleccionado
  let pedidoSelected = null;
  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === +req.params.id) { //busca por id, el + es para convertir el id
      pedidoSelected = PEDIDOS[i]; //cuando lo encuentra lo guarda para mostrarlo como info
      break;
    }
  }
  if (pedidoSelected) {
    res.status(200).send(pedidoSelected);
  } else {
    res.status(404).send({ errorMessage: 'Pedido no encontrado' });
  }
}

const verHistorialPedido = (req, res) => {
  res.status(200).send(PEDIDOS); //envia todos los datos de pedidos
}

const editarPedido = (req, res) => {
  // simulando un pedido previamente existente que el cliente modifica
  let { id, info_productos } = req.body; //guarda el id del pedido a editar y su arreglo de objetos de productos
  let pedidoEdited = null; //variable para guardar el pedido editado
  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === id) { //cuando encuentre el pedido acorde a su id
      PEDIDOS[i].info_productos = info_productos; //cambia el valor indicado por el nuevo
      pedidoEdited = PEDIDOS[i]; //guarda este objeto modificado para ser mostrado en la respuesta
      break;
    }
  }
  if (pedidoEdited) {
    res.status(200).send(pedidoEdited);
  } else {
    res.status(404).send({ errorMessage: 'Not Found: Pedido no encontrado.' });
  }
}
//aqui aplica nuestro Cancelar(){} 
const cambiarEstatusPedido = (req, res) => {
  //ACTIVOS=1, CANCELADOS=0
  let pedidoEdited = null; //variable para guardar el pedido editado
  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === req.body.id) { //cuando encuentre el pedido acorde a su id
      PEDIDOS[i].estatus = req.body.estatus; //modifica para poner el nuevo estatus
      pedidoEdited = PEDIDOS[i]; //guarda el objeto para ser mostrado en la respuesta
      break;
    }
  }
  if (pedidoEdited) {
    res.status(200).send(pedidoEdited);
  } else {
    res.status(404).send({ errorMessage: 'Not found' });
  }
}

const filtrarPedido = (req, res) => {
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

const eliminarPedido = (req, res) => {
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
  verHistorialPedido,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  eliminarPedido,
};
