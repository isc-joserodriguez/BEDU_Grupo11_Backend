
// controllers/categoria.js
const mongoose = require("mongoose")
const Categoria = mongoose.model("Categoria")

//--------------------------------------------------------------------
const crearCategoria = (req, res,next) => {
  if(req.usuario.type!=="admin"){
    return res.status(401).send("sin permisos")
  }
  // Instanciaremos una nueva categoria utilizando la clase categoria
  let categoria = new Categoria(req.body)
    categoria.save().then(categ => {    //Guardando nuevo usuario en MongoDB.
      return res.status(201).json(categ)
    }).catch(next)
}

function verCategoria(req, res, next) {                              //Obteniendo categoria desde MongoDB.
  if(req.usuario.type==="chef"){
    return res.status(401).send("sin permisos")
  }
  Categoria.findById(req.params.id, (err, categ) => {
    if (!categ || err) {
      return res.sendStatus(401)
    }
    return res.json(categ.publicData());
  }).catch(next);
}


function verCategorias(req, res, next) {   
  if(req.usuario.type==="chef"){
    return res.status(401).send("sin permisos")
  }                           //Obteniendo categorias desde MongoDB.
  Categoria.find((err, categ) => {
    if (!categ || err) {
      return res.sendStatus(401)
    }
    return res.json(categ);
  }).catch(next);
}

function editarCategoria(req, res, next) {
  if(req.usuario.type!=="admin"){
    return res.status(401).send("sin permisos")
  }
  //db.collection.findOneAndUpdate({busqueda},{nuevos:datos},{new:true})
  Categoria.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true}).then(categ => {
    if (!categ) { return res.sendStatus(401); }
    res.status(201).json(categ)
  }).catch(next)
}

function cambiarEstatusCategoria(req, res, next) {
  if(req.usuario.type!=="admin"){
    return res.status(401).send("sin permisos")
  }
  //db.collection.findOneAndUpdate({busqueda},{nuevos:datos},{new:true})
  Categoria.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true}).then(categ => {
    if (!categ) { return res.sendStatus(401); }
    res.status(201).json(categ)
  }).catch(next)
}

function filtrarCategoria(req, res, next) { 
  if(req.usuario.type==="chef"){
    return res.status(401).send("sin permisos")
  } 
  let campo = Object.keys(req.body)[0]; //toma el nombre de la propiedad del objeto por la que se va a filtrar
  let dato = req.body[campo]; //guarda el valor de esta propiedad (valor a buscar)                             //Obteniendo categoria desde MongoDB.
  let filter = {}
  filter[campo]= new RegExp(`${dato}`, "i");
  
  Categoria.find(filter).then ((categ,err) => {
       console.log(err);
    if (!categ || err) { 
      return res.sendStatus(401)
    }
    return res.json(categ);
  }).catch(next);
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

