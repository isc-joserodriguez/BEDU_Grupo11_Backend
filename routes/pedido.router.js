//Instanciamos una nueva variable de Express
const router = require('express').Router();
const auth = require('../middlewares/auth');
//Importamos los métodos del controlador
const {
  crearPedido,
  verPedido,
  verHistorialPedidos,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  eliminarPedido
} = require('../controllers/pedido.controller')

//Asignamos las rutas para cada método
router.get('/:id', auth.requerido, verPedido)
router.get('/', auth.requerido, verHistorialPedidos)
router.post('/filtrar', auth.requerido, filtrarPedido)
router.post('/', auth.requerido, crearPedido)
router.put('/editar', auth.requerido, editarPedido)
router.put('/cambiarEstatus', auth.requerido, cambiarEstatusPedido)
router.delete('/:id', auth.requerido,eliminarPedido)


module.exports = router;