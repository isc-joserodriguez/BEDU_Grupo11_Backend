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
router.get('/:id', auth.requerido, verPedido)//N
router.get('/', auth.requerido, verHistorialPedidos)//N
router.post('/filtrar', auth.requerido, filtrarPedido)//N
router.post('/', auth.requerido, crearPedido)//N
router.put('/editar', auth.requerido, editarPedido)//N
router.put('/cambiarEstatus', auth.requerido, cambiarEstatusPedido)//N
router.delete('/:id', auth.requerido,eliminarPedido)


module.exports = router;