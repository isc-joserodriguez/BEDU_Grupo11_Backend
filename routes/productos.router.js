//Instanciamos una nueva variable de Express
const router = require('express').Router();
const auth = require('../middlewares/auth');

//Importar funciones del controlador
const {
  crearProducto,
  cambiarEstatusProducto,
  editarProducto,
  verProducto,
  verProductos,
  filtrarProducto,
} = require('../controllers/producto.controller');

//Rutas definidas de las funciones
router.get('/:id', verProducto);
router.get('/', verProductos);
router.post('/filtrar', filtrarProducto);
router.post('/', auth.requerido, crearProducto);
router.put('/cambiarEstatus/:id', auth.requerido, cambiarEstatusProducto);
router.put('/editar/:id', auth.requerido, editarProducto);

module.exports = router;
