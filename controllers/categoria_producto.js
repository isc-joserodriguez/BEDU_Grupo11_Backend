// importamos el modelo de usuarios
const Categoria_producto = require('../models/Categoria_producto')
var CATEGORIAS = [new Categoria_producto({id:1, nombre:'Desayunos', descripcion:'Es la cat de desayunos servida de 7-9am', estatus:1}),
                new Categoria_producto({id:2, nombre:'Jugos', descripcion:'Es la cat de jugos naturales', estatus:1}),
                new Categoria_producto({id:3, nombre:'Sodas', descripcion:'Es la cat de refrescos', estatus:1})]

function crearCategoria_producto(req, res) {
  // Instanciaremos una nueva categoria utilizando la clase categoria_producto
  var categoria_producto = new Categoria_producto(req.body)
  CATEGORIAS.push(categoria_producto)
  res.status(201).send(categoria_producto)
}

function verCategoria_producto(req, res) {
  console.log(CATEGORIAS);
    res.send(CATEGORIAS)
}

function editarCategoria_producto(req, res) {
  // simulando una categoria previamente existente que el cliente modifica
  let datos = req.body;
  let categoria_productoEdited = null;
  for(let i=0; i<CATEGORIAS.length;i++){
     if(CATEGORIAS[i].id===datos.id){
        for(campo in datos){
            CATEGORIAS[i][campo]=datos[campo];
            categoria_productoEdited = CATEGORIAS[i];
          }
     }
  }
  res.status(200).send(categoria_productoEdited);
}

function cambiarEstatusCategoria_producto(req, res) {
    let categoria_productoEdited = null;
    for(let i=0; i<CATEGORIAS.length;i++){
        console.log(CATEGORIAS[i].id, req.body.id);
         if(CATEGORIAS[i].id===req.body.id){
            categoria_productoEdited = CATEGORIAS[i];
            categoria_productoEdited.estatus = req.body.estatus;
         }
    }
    if(categoria_productoEdited){
        res.status(200).send(categoria_productoEdited);
    }
    else{
        res.status(404).send({errorMessage: "Not found"});
    }
  }

  

function filtrarCategoria_producto(req,res) {
    let campo = Object.keys(req.body)[0];
    let dato = req.body[campo];
    let categorias = CATEGORIAS.filter(categoria => categoria[campo] == dato);
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

