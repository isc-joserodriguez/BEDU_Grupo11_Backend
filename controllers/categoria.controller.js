// controllers/categoria.js
const mongoose = require("mongoose");
const Categoria = mongoose.model("Categoria");
const codeResponses = require("../config").codeResponses;

//--------------------------------------------------------------------
const crearCategoria = (req, res, next) => {
  if (req.usuario.type !== "admin")
    return res.status(401).send(
      {
        ...codeResponses[401],
        message: "Sólo el administrador puede crear una nueva categoría"
      }
    );
  // Instanciaremos una nueva categoria utilizando la clase categoria
  let categoria = new Categoria(req.body)
  categoria.save().then((categ, error) => {    //Guardando nuevo usuario en MongoDB.
    if (error)
      return res.status(401).send(
        {
          ...codeResponses[401],
          message: "Sólo el administrador puede crear una nueva categoría"
        }
      );
    return res.status(201).json(
      {
        ...codeResponses[201],
        detail: categ
      })
  }).catch(next)
}

function verCategoria(req, res, next) {                              //Obteniendo categoria desde MongoDB.
  if (req.usuario.type === "chef") {
    return res.status(401).send(
      {
        ...codeResponses[401],
        message: "No puedes ver esta opción."
      }
    );
  }
  Categoria.findById(req.params.id).then((categ, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!categ) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "Categoria no encontrada"
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: categ
    });
  }).catch(next);
}


function verCategorias(req, res, next) {
  if (req.usuario.type === "chef") {
    return res.status(401).send(
      {
        ...codeResponses[401],
        message: "No puedes ver esta opción."
      }
    );
  }                           //Obteniendo categorias desde MongoDB.
  Categoria.find({})((categ, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!categ) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "No hay categorias."
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: categ
    });
  }).catch(next);
}

function editarCategoria(req, res, next) {
  if (req.usuario.type !== "admin") {
    return res.status(401).send({
      ...codeResponses[401],
      message: "Sólo el administrador puede editar una categoría."
    });
  }
  //db.collection.findOneAndUpdate({busqueda},{nuevos:datos},{new:true})
  Categoria.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then((categ, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!categ) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "No se encontró la categoría."
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: categ
    });
  }).catch(next)
}

function cambiarEstatusCategoria(req, res, next) {
  if (req.usuario.type !== "admin") {
    return res.status(401).send({
      ...codeResponses[401],
      message: "Sólo el administrador puede editar una categoría."
    });
  }
  Categoria.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then((categ, error) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!categ) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "No se encontró la categoría."
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: categ
    });
  }).catch(next)
}

function filtrarCategoria(req, res, next) {
  if (req.usuario.type === "chef") {
    return res.status(401).send({
      ...codeResponses[401],
      message: "No puedes ver esta opción."
    });
  }
  let campo = Object.keys(req.body)[0]; //toma el name de la propiedad del objeto por la que se va a filtrar
  let dato = req.body[campo]; //guarda el valor de esta propiedad (valor a buscar)                             //Obteniendo categoria desde MongoDB.
  let filter = {}
  filter[campo] = new RegExp(`${dato}`, "i");

  Categoria.find(filter).then((categ, err) => {
    if (error) {
      return res.status(400).send({
        ...codeResponses[400],
        message: error
      });
    } else if (!categ) {
      return res.status(404).send({
        ...codeResponses[404],
        message: "No se encontró la categoría."
      });
    }
    return res.status(200).send({
      ...codeResponses[200],
      detail: categ
    });
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

