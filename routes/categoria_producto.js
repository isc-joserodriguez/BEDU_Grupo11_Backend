//Instanciamos una nueva variable de Express
const router = require('express').Router();
//Importamos los métodos del controlador
const {
  crearCategoria_producto,
  verCategoria_producto,
  editarCategoria_producto,
  cambiarEstatusCategoria_producto,
  filtrarCategoria_producto
} = require('../controllers/categoria_producto')
//Asignamos las rutas para cada método
router.get('/', verCategoria_producto)
router.post('/filtrar', filtrarCategoria_producto)
router.post('/', crearCategoria_producto)
router.put('/editar', editarCategoria_producto)
router.put('/cambiarEstatus', cambiarEstatusCategoria_producto)


module.exports = router;