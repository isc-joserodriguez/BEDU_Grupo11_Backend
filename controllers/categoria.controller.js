// importamos el modelo de categoria
const { Categoria } = require('../models')
//creamos arreglo de objetos para los datos
const CATEGORIAS = [
  new Categoria({ id: 1, nombre: 'Desayunos', descripcion: 'Es la cat de desayunos servida de 7-9am', estatus: 1 }),
  new Categoria({ id: 2, nombre: 'Jugos', descripcion: 'Es la cat de jugos naturales', estatus: 1 }),
  new Categoria({ id: 3, nombre: 'Sodas', descripcion: 'Es la cat de refrescos', estatus: 1 })
]

const crearCategoria = (req, res) => {
  // Instanciaremos una nueva categoria utilizando la clase categoria
  let categoria = new Categoria(req.body)

  if (!!categoria.id) { //Validar si la nueva categoria tiene id
    CATEGORIAS.push(categoria) //agregar al arreglo
    res.status(201).send(categoria) //enviarla como respuesta al ser exitosa la llamada
  }
  else {
    res.status(304).send({ Message: 'Not Modified: No se agregó producto vacío' }); //ya que no se pueden agregar vacios se envia al siguiente mensaje
  }
}

const verCategorias = (req, res) => {
  res.status(200).send(CATEGORIAS) //envia todos los datos de categorias
}

const verCategoria = (req, res) => {
  let { id } = req.params;
  let categoria = CATEGORIAS.filter((categoria) => categoria.id === +id); //Filtra la categoría con cierto id
  if (!!categoria[0]) {
    res.status(200).send(categoria[0]);
  } else {
    res.status(400).send({ errorMessage: "Not Found: No existe el usuario" });
  }
};


const editarCategoria = (req, res) => {
  // toda la informacion necesaria va en req.body
  let datos = req.body;
  let categoriaEdited = null; //variable para guardar la categoria editada
  for (let i = 0; i < CATEGORIAS.length; i++) {
    if (CATEGORIAS[i].id === datos.id) { //cuando encuentre la categoria acorde a su id
      for (campo in datos) {
        CATEGORIAS[i][campo] = datos[campo]; //cambia el valor de la propiedad del objeto indicado por el nuevo
        categoriaEdited = CATEGORIAS[i]; //guarda este objeto modificado para ser mostrado en la respuesta
      }
    }
  }
  if (categoriaEdited) {
    res.status(200).send(categoriaEdited);
  } else {
    res.status(404).send({ errorMessage: 'Not Found: Categoría no encontrada' });
  }
}

const cambiarEstatusCategoria = (req, res) => {
  let categoriaEdited = null; //variable para guardar la categoria editada
  for (let i = 0; i < CATEGORIAS.length; i++) {
    if (CATEGORIAS[i].id === req.body.id) { //cuando encuentre la categoria acorde a su id
      CATEGORIAS[i].estatus = req.body.estatus; //se cambia el estatus de la seleccion acorde al estatus nuevo que se le envia
      categoriaEdited = CATEGORIAS[i]; //guarda el objeto
    }
  }
  if (categoriaEdited) {
    res.status(200).send(categoriaEdited);
  }
  else {
    res.status(404).send({ errorMessage: "Not found" });
  }
}

const filtrarCategoria = (req, res) => {
  let campo = Object.keys(req.body)[0]; //toma el nombre de la propiedad del objeto por la que se va a filtrar
  let dato = req.body[campo]; //guarda el valor de esta propiedad (valor a buscar)
  let categoriasFiltradas = CATEGORIAS.filter(categoria => {
    let regex = new RegExp(dato, 'gi'); //utiliza expresion regular para hacer busqueda global e ignorar capitalizacion de letras
    return regex.test(categoria[campo]);
  });

  if (!!categoriasFiltradas[0]) {
    res.status(200).send(categoriasFiltradas); //muestra resultados encontrados
  } else {
    res.status(404).send({ errorMessage: 'NotFound: Busqueda no arrojó resultados' });
  }
}

// exportamos las funciones definidas
module.exports = {
  crearCategoria,
  verCategorias,
  verCategoria,
  editarCategoria,
  cambiarEstatusCategoria,
  filtrarCategoria
}

