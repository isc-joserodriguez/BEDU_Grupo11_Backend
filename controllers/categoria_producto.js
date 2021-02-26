// importamos el modelo de usuarios
const Categoria_producto = require('../models/Categoria_producto')
var CATEGORIAS = [new Categoria_producto(1, 'Desayunos', 'Es la cat de desayunos servida de 7-9am', 1),
                new Categoria_producto(2, 'Jugos', 'Es la cat de jugos naturales', 1),
                new Categoria_producto(3, 'Sodas', 'Es la cat de refrescos', 1)]

function crearCategoria_producto(req, res) {
  // Instanciaremos una nueva categoria utilizando la clase categoria_producto
  var categoria_producto = new Categoria_producto(req.body)
  res.status(201).send(categoria_producto)
}

function verCategoria_producto(req, res) {
  res.send(CATEGORIAS)
}

function editarCategoria_producto(req, res) {
  // simulando una categoria previamente existente que el cliente modifica
  let datos = req.body;
  let categoria_productoEdited = null;
  for(let i=0; i<=CATEGORIAS.length;i++){
     if(CATEGORIAS[i].id===datos.id){
        for(campo in datos){
            CATEGORIAS[i][campo]=datos[campo];
            categoria_productoEdited = CATEGORIAS[i];
          }
     }
  }
  res.status(200).send();
}

function cambiarEstatusCategoria_producto(req, res) {
    let categoria_productoEdited = null;
    for(let i=0; i<=CATEGORIAS.length;i++){
         if(CATEGORIAS[i].id===req.params.id){
            categoria_productoEdited = CATEGORIAS[i];
            categoria_productoEdited.status = req.body.estatus;
         }
    }
    if(categoria_productoEdited){
        res.estatus(200).send();
    }
    else{
        res.estatus(404).send({errorMessage: "Not found"});
    }
  }

  

function filtrarCategoria_producto(req,res) {
    let campo = req.body.Object.keys()[0];
    let dato = req.body[campo];
    let categorias = CATEGORIAS.filter(categoria => categoria.campo == dato);
    /*for(let i=0; i<=CATEGORIAS.length;i++){
            for(campo in datos){
                CATEGORIAS[i][campo]=datos[campo];
                categoria_productoEdited = CATEGORIAS[i];
            }
    }*/
    res.status(200).send(categorias);
}

// exportamos las funciones definidas
module.exports = {
  crearCategoria_producto,
  verCategoria_producto,
  editarCategoria_producto,
  cambiarEstatusCategoria_producto,
  filtrarCategoria_producto
}

