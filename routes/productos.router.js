//Instanciamos una nueva variable de Express
const router = require('express').Router();
const auth = require('../middlewares/auth');

//Importar funciones del controlador
const {
  crearProducto,
  eliminarProducto,
  cambiarEstatusProducto,
  editarProducto,
  verProducto,
  verProductos,
  filtrarProducto,
} = require('../controllers/producto.controller');

//Rutas definidas de las funciones
router.get('/:id', auth.requerido, verProducto);
router.get('/', auth.requerido, verProductos);
router.post('/filtrar', auth.requerido, filtrarProducto);
router.post('/', auth.requerido, crearProducto);
router.put('/cambiarEstatus/:id', auth.requerido, cambiarEstatusProducto);
router.put('/editar/:id', auth.requerido, editarProducto);
router.delete('/:id', auth.requerido, eliminarProducto);

module.exports = router;
