//Importamos los 4 modelos
const Categoria_producto = require('./Categoria_producto.model');
const Pedido = require('./Pedido.model');
const Producto = require('./Producto.model');
const Usuario = require('./Usuario.model');

//Agregamos los modelos a un objeto
const Models = {
    Categoria_producto,
    Pedido,
    Producto,
    Usuario
};

//Exportamos el objeto
module.exports = Models;