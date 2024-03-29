//Instanciamos una nueva variable de Express
const router = require('express').Router();
const auth = require('../middlewares/auth');
//Importamos los métodos del controlador
const {
  crearPedido,
  verPedido,
  verPedidos,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  verPedidoProcesando,
  verPedidosPropios,
  verPendientes,
  eliminarPedido,
} = require('../controllers/pedido.controller')

//Asignamos las rutas para cada método
router.get('/procesando', auth.requerido, verPedidoProcesando)//N
router.get('/propios', auth.requerido, verPedidosPropios)//N
router.get('/pendientes', auth.requerido, verPendientes)//N
router.get('/:id', auth.requerido, verPedido)//N
router.get('/', auth.requerido, verPedidos)//N
router.post('/filtrar', auth.requerido, filtrarPedido)//N
router.post('/', auth.requerido, crearPedido)//N
router.put('/editar/:id', auth.requerido, editarPedido)//N
router.put('/cambiarEstatus/:id', auth.requerido, cambiarEstatusPedido)//N
router.delete('/:id', auth.requerido, eliminarPedido)


module.exports = router;