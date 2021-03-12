//Importamos los 4 modelos
const Categoria = require('./Categoria.model');
const Pedido = require('./Pedido.model');
const Producto = require('./Producto.model');
const Usuario = require('./Usuario.model');

//Agregamos los modelos a un objeto
const Models = {
    Categoria,
    Pedido,
    Producto,
    Usuario
};

//Exportamos el objeto
module.exports = Models;