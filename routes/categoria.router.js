//Instanciamos una nueva variable de Express
const router = require('express').Router();
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
router.get('/', verCategorias);
router.get('/:id', verCategoria);
router.post('/filtrar', filtrarCategoria);
router.post('/', crearCategoria);
router.put('/editar', editarCategoria);
router.put('/cambiarEstatus', cambiarEstatusCategoria);

module.exports = router;