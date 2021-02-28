//Importamos el modelo de producto
const Producto = require('../models/Producto')

var PRODUCTOS = [new Producto({id:1, nombre:'Chilaquiles', id_categoria:1, descripcion:'Chilaquiles con pollo en salsa verde y queso doble crema', costo: 75, disponibilidad:1}),
                new Producto({id:2, nombre:'Jugo de naranja', id_categoria:2, descripcion:'Jugo de naranja 500 ml', costo: 30, disponibilidad:1}),
                new Producto({id:3, nombre:'Sprite', id_categoria:3, descripcion:'Sprite en lata 355ml', costo: 20, disponibilidad:1}),
                new Producto({id:4, nombre:'Huevos al gusto', id_categoria:1, descripcion:'Huevos al gusto (omelette, revueltos, estrellados)', costo: 60, disponibilidad:1}),
                new Producto({id:5, nombre:'Jugo de mandarina', id_categoria:2, descripcion:'Jugo de mandarina 500 ml', costo: 30, disponibilidad:1}),
                new Producto({id:6, nombre:'Mirinda', id_categoria:3, descripcion:'Mirinda en lata 355ml', costo: 20, disponibilidad:1}),
                new Producto({id:7, nombre:'Molletes', id_categoria:1, descripcion:'Molletes con queso manchego (2 piezas)', costo: 50, disponibilidad:1}),
                new Producto({id:8, nombre:'Jugo de betabel', id_categoria:2, descripcion:'Jugo de betabel 500 ml', costo: 30, disponibilidad:1}),
                new Producto({id:9, nombre:'Manzanita Sol', id_categoria:3, descripcion:'Manzanita Sol en lata 355ml', costo: 20, disponibilidad:1}),
]

function crearProducto(req,res) {
    var producto = new Producto(req.body)
    
    PRODUCTOS.push(producto)
    res.status(201).send(producto)
    
}

function eliminarProducto(req,res) {
    let productoEncontrado = null;
    for(let i=0; i<PRODUCTOS.length;i++){
        if(PRODUCTOS[i].id===+req.params.id){
            productoEncontrado = PRODUCTOS[i]
            PRODUCTOS.splice(i,1)
            break;
        }
     }
     if(productoEncontrado) {(res.status(200).send(productoEncontrado))}
     else { res.status(404).send({errorMessage:'Not Found: Producto no encontrado.'}); }


    //PRODUCTOS.splice(req.body.id,1)
    //res.status(200).send(`Producto ${req.params.id} eliminado.`)
}

function cambiarEstatusProducto(req, res) { //INACTIVO = 0    ACTIVO =1
    let productoEncontrado = null;
    for(let i=0; i<PRODUCTOS.length;i++){
        if(PRODUCTOS[i].id===req.body.id){
            productoEncontrado = PRODUCTOS[i]
            productoEncontrado.disponibilidad = req.body.disponibilidad;
            break;
        }
     }

     if(productoEncontrado) {(res.status(200).send(productoEncontrado))}
     else { res.status(404).send({errorMessage:'Not Found: Producto no encontrado.'}); }
}

function editarProducto(req, res) {
    let productoEncontrado = null;
    let datos = req.body;
    for(let i=0; i<PRODUCTOS.length;i++){
     if(PRODUCTOS[i].id===datos.id){
        for(campo in datos){
            PRODUCTOS[i][campo]=datos[campo];
            productoEncontrado = PRODUCTOS[i];
          }
     }
  }
    if(productoEncontrado) {(res.status(200).send(productoEncontrado))}
    else { res.status(404).send({errorMessage:'Not Found: Producto no encontrado.'}); }
}

function verProducto(req, res) {
    let productoSeleccionado = null;
    for(let i=0; i<PRODUCTOS.length;i++){
        if(PRODUCTOS[i].id===+req.params.id){
            productoSeleccionado = PRODUCTOS[i];
            break;
        }
     }
     if(productoSeleccionado !== null){
        res.send(productoSeleccionado)
     }
     else {
        res.status(404).send({errorMessage:'Not Found: Producto no encontrado.'});
     }
}

function verProductos(req, res) {
        res.status(200).send(PRODUCTOS)
}


function filtrarProducto(req, res) {
}

module.exports = {
    crearProducto,
    eliminarProducto,
    cambiarEstatusProducto,
    editarProducto,
    verProducto,
    verProductos,
    filtrarProducto
}
