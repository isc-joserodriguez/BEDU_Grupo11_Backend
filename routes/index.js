// importamos las dependencias necesarias
var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('Welcome to Api-RESTaurant');
});

//Se ponen disponibles las rutas de nuestros endpoint
router.use('/usuarios', require('./usuarios'));
router.use('/categoria_producto', require('./categoria_producto'));
router.use('/productos', require('./productos'));
router.use('/pedido', require('./pedido'));

module.exports = router;