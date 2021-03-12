//Instanciamos una nueva variable de Express
const router = require('express').Router();
const auth = require('../middlewares/auth');
//Importamos los métodos del controlador
const {
  crearCategoria,
  verCategorias,
  verCategoria,
  editarCategoria,
  cambiarEstatusCategoria,
  filtrarCategoria
} = require('../controllers/categoria.controller');
//Asignamos las rutas para cada método
router.get('/', auth.requerido, verCategorias);
router.get('/:id', auth.requerido, verCategoria);
router.post('/filtrar',auth.requerido,  filtrarCategoria);
router.post('/',auth.requerido,  crearCategoria);
router.put('/editar/:id',auth.requerido,  editarCategoria);
router.put('/cambiarEstatus', auth.requerido, cambiarEstatusCategoria);


module.exports = router;