// Estructura del CRUD
const router = require('express').Router();
const {
  crearCategoria_producto,
  verCategoria_producto,
  editarCategoria_producto,
  cambiarEstatusCategoria_producto,
  filtrarCategoria_producto
} = require('../controllers/categoria_producto')

router.get('/', verCategoria_producto)
router.get('/', filtrarCategoria_producto)
router.post('/', crearCategoria_producto)
router.put('/', editarCategoria_producto)
router.put('/:id', cambiarEstatusCategoria_producto)


module.exports = router;