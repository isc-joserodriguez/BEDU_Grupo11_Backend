//Instanciamos una nueva variable de Express
const router = require('express').Router();
//Importamos los métodos del controlador
const {
  crearCategoria_producto,
  verCategorias,
  verCategoria,
  editarCategoria_producto,
  cambiarEstatusCategoria_producto,
  filtrarCategoria_producto
} = require('../controllers/categoria_producto.controller');
//Asignamos las rutas para cada método
router.get('/', verCategorias);
router.get('/:id', verCategoria);
router.post('/filtrar', filtrarCategoria_producto);
router.post('/', crearCategoria_producto);
router.put('/editar', editarCategoria_producto);
router.put('/cambiarEstatus', cambiarEstatusCategoria_producto);

module.exports = router;