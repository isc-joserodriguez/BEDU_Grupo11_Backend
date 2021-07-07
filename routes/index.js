// importamos las dependencias necesarias
let router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send(`
  <h1>Welcome to Api-RESTaurant</h1>
  <a href="https://bedu-api-restaurante.herokuapp.com/api-docs/"> Swagger API-DOCS</a>
  <br>
  <a href="https://github.com/isc-joserodriguez/BEDU_Grupo11_Backend"> Repositorio</a>
  `);
});

//Se ponen disponibles las rutas de nuestros endpoint
router.use('/usuarios', require('./usuarios.router'));
router.use('/categoria', require('./categoria.router'));
router.use('/productos', require('./productos.router'));
router.use('/pedido', require('./pedido.router'));

module.exports = router;