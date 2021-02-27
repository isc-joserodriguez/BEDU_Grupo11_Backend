//Archivo controllers/producto.js

//Importamos el modelo de producto
const Producto = require('../models/Producto')

function crearProducto(req,res) {
    var producto = new Producto(req.body)
    res.status(201).send(producto)
}

function eliminarProducto(req,res) {
    res.status(200).send(`Producto ${req.params.id} eliminado.`)
}

function desactivarProducto(req, rep) {
    var modificaciones = req.body
    producto1 = {...producto1, ...modificaciones}
    res.status(200).send(`Producto ${req.params.id} desactivado.`)

}

function activarProducto(req, rep) {
    var modificaciones = req.body
    producto1 = {...producto1, ...modificaciones}
    res.status(200).send(`Producto ${req.params.id} activado.`)
}

function editarProducto(req, res) {
    var producto1 = new Producto(req.params.id, 'Limonada', 'req.params.id_categoria', 'Limonada mineral 500ml', 'disponible')
    var producto2 = new Producto(req.params.id, 'Naranjada', 'req.params.id_categoria', 'Naranjada mineral 500ml', 'disponible')

    var modificaciones = req.body
    producto1 = {...producto1, ...modificaciones}
    res.send(producto1)
    
    }

function verProducto(req, res) {
    res.status(200).send(req)
    }

function filtrarProducto(req, res) {
    res.status(200).send(req)
    }

module.exports = {
    crearProducto,
    eliminarProducto,
    desactivarProducto,
    activarProducto,
    editarProducto,
    verProducto,
    filtrarProducto
}
