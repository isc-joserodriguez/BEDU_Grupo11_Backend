// importamos el modelo de categoria_producto
const Categoria_producto = require('../models/Categoria_producto')
//creamos arreglo de objetos para los datos
var CATEGORIAS = [new Categoria_producto({id:1, nombre:'Desayunos', descripcion:'Es la cat de desayunos servida de 7-9am', estatus:1}),
                new Categoria_producto({id:2, nombre:'Jugos', descripcion:'Es la cat de jugos naturales', estatus:1}),
                new Categoria_producto({id:3, nombre:'Sodas', descripcion:'Es la cat de refrescos', estatus:1})]

function crearCategoria_producto(req, res) {
  // Instanciaremos una nueva categoria utilizando la clase categoria_producto
  var categoria_producto = new Categoria_producto(req.body)
  
  if(!!categoria_producto.id){ //Validar si la nueva categoria tiene id
    CATEGORIAS.push(categoria_producto) //agregar al arreglo
    res.status(201).send(categoria_producto) //enviarla como respuesta al ser exitosa la llamada
} 
else {
    res.status(304).send({Message:'Not Modified: No se agregó producto vacío'}); //ya que no se pueden agregar vacios se envia al siguiente mensaje
}
}

function verCategoria_producto(req, res) {
    res.send(CATEGORIAS) //envia todos los datos de categorias
}

function editarCategoria_producto(req, res) {
  // toda la informacion necesaria va en req.body
  let datos = req.body;
  let categoria_productoEdited = null; //variable para guardar la categoria editada
  for(let i=0; i<CATEGORIAS.length;i++){ 
     if(CATEGORIAS[i].id===datos.id){ //cuando encuentre la categoria acorde a su id
        for(campo in datos){
            CATEGORIAS[i][campo]=datos[campo]; //cambia el valor de la propiedad del objeto indicado por el nuevo
            categoria_productoEdited = CATEGORIAS[i]; //guarda este objeto modificado para ser mostrado en la respuesta
          }
     }
  }
  res.status(200).send(categoria_productoEdited);
}

function cambiarEstatusCategoria_producto(req, res) {
    let categoria_productoEdited = null; //variable para guardar la categoria editada
    for(let i=0; i<CATEGORIAS.length;i++){
         if(CATEGORIAS[i].id===req.body.id){ //cuando encuentre la categoria acorde a su id
          CATEGORIAS[i].estatus = req.body.estatus; //se cambia el estatus de la seleccion acorde al estatus nuevo que se le envia
          categoria_productoEdited = CATEGORIAS[i]; //guarda el objeto
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
    let campo = Object.keys(req.body)[0]; //toma el nombre de la propiedad del objeto por la que se va a filtrar
    let dato = req.body[campo]; //guarda el valor de esta propiedad (valor a buscar)
    let categoriasFiltradas = CATEGORIAS.filter(categoria => {
      let regex= new RegExp(dato, 'gi'); //utiliza expresion regular para hacer busqueda global e ignorar capitalizacion de letras
      return regex.test(categoria[campo]);
    });
    
    if(!!categoriasFiltradas[0]){
      res.status(200).send(productosFiltrados); //muestra resultados encontrados
  }else{
      res.status(404).send({errorMessage:'NotFound: Busqueda no arrojó resultados'});
  }
}

// exportamos las funciones definidas
module.exports = {
  crearCategoria_producto,
  verCategoria_producto,
  editarCategoria_producto,
  cambiarEstatusCategoria_producto,
  filtrarCategoria_producto
}

