// importamos las dependencias necesarias
let router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('Welcome to Api-RESTaurant');
});

//Se ponen disponibles las rutas de nuestros endpoint
router.use('/usuarios', require('./usuarios.router'));
router.use('/categoria_producto', require('./categoria_producto.router'));
router.use('/productos', require('./productos.router'));
router.use('/pedido', require('./pedido.router'));

module.exports = router;