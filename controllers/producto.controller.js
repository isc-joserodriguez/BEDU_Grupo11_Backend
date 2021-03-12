//Importamos el modelo de producto
const { Producto } = require('../models');

//Crear producto nuevo
const crearProducto = (req, res) => {
    let producto = new Producto(req.body)
    if (!!producto.id) {              //Validar si el nuevo producto tiene id
        PRODUCTOS.push(producto)    //Agregar nuevo producto
        res.status(201).send(producto)      //Mensaje producto gregado
    }
    else {
        res.status(304).send({ Message: 'Not Modified: No se agregó producto vacío' }); //Mensaje error
    }
}

//Eliminar producto
const eliminarProducto = (req, res) => {
    let productoEncontrado = null;
    let encontrado = false;
    for (let i = 0; i < PRODUCTOS.length; i++) {           //Para cada elemento dentro del arreglo
        if (PRODUCTOS[i].id === +req.params.id) {       //Buscar dentro de los productos por id
            if (!PRODUCTOS[i].estatus) {                //Si está inactivo, se cancela
                productoEncontrado = PRODUCTOS[i]       //Asignar a variable producto encontrado
                PRODUCTOS.splice(i, 1)                   //Eliminar producto del arreglo
            }
            encontrado = true;
            break;
        }
    }
    if (productoEncontrado) {
        res.status(200).send(productoEncontrado)  //Mensaje producto eliminado
    } else if (encontrado) {
        res.status(409).send({ errorMessage: 'Conflict: No se puede eliminar un producto activo' })
    } else {
        res.status(404).send({ errorMessage: 'Not Found: Producto no encontrado.' });//Mensaje error: no encontrado
    }
}

//Cambiar estatus de producto
const cambiarEstatusProducto = (req, res) => {         //INACTIVO = 0    ACTIVO =1
    let productoEncontrado = null;
    for (let i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].id === req.body.id) {          //Buscar dentro de los productos por id
            productoEncontrado = PRODUCTOS[i]       //Asigna el producto que coincide
            PRODUCTOS[i].estatus = req.body.estatus; //Cambiar estatus 
            break;
        }
    }

    if (productoEncontrado) { (res.status(200).send(productoEncontrado)) } //Mensaje estatus actualizado
    else { res.status(404).send({ errorMessage: 'Not Found: Producto no encontrado.' }); } //Mensaje error
}

//Editar producto
const editarProducto = (req, res) => {
    let productoEncontrado = null;
    let datos = req.body;
    for (let i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].id === datos.id) {            //Buscar dentro de los productos por id
            for (campo in datos) {
                PRODUCTOS[i][campo] = datos[campo];   //Modificar valores
                productoEncontrado = PRODUCTOS[i];
            }
        }
    }
    if (productoEncontrado) { (res.status(200).send(productoEncontrado)) } //Mensaje producto modificado
    else { res.status(404).send({ errorMessage: 'Not Found: Producto no encontrado.' }); } //Mensaje error
}

const verProducto = (req, res) => {
    let productoSeleccionado = null;
    for (let i = 0; i < PRODUCTOS.length; i++) {       //Buscar dentro de los productos por id
        if (PRODUCTOS[i].id === +req.params.id) {
            productoSeleccionado = PRODUCTOS[i];
            break;
        }
    }
    if (productoSeleccionado !== null) {         //Retornar producto encontrado
        res.send(productoSeleccionado)
    }
    else {
        res.status(404).send({ errorMessage: 'Not Found: Producto no encontrado.' }); //Mensaje error
    }
}

//Mostrar todos los productos
const verProductos = (req, res) => {
    res.status(200).send(PRODUCTOS)
}

//Filtrar productos
const filtrarProducto = (req, res) => {
    let campo = Object.keys(req.body)[0];                   //Obtener campo del objeto
    let valor = req.body[campo];                              //Obtener el contenido del campo

    let productosFiltrados = PRODUCTOS.filter(producto => {    //Crear nuevo arreglo con los articulos que coinciden     
        let regex = new RegExp(valor, 'gi');                 //Expresion regular que ignora mayusculas/minusculas
        return regex.test(producto[campo]);                 //Verificar coincidencia
    });

    if (!!productosFiltrados[0]) {
        res.status(200).send(productosFiltrados);           //Retorno de productos filtrados
    } else {
        res.status(404).send({ errorMessage: 'NotFound: Busqueda no arrojó resultados' }); //Mensaje error
    }
}

//Exportar funciones
module.exports = {
    crearProducto,
    eliminarProducto,
    cambiarEstatusProducto,
    editarProducto,
    verProducto,
    verProductos,
    filtrarProducto
}
