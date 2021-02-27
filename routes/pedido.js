// Estructura del CRUD
const router = require('express').Router();
const {
  crearPedido,
  verPedido,
  verHistorialPedido,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  eliminarPedido
} = require('../controllers/pedido')


router.get('/:id', verPedido)
router.get('/', verHistorialPedido)
router.post('/filtrar', filtrarPedido)
router.post('/', crearPedido)
router.put('/editar', editarPedido)
router.put('/cambiarEstatus', cambiarEstatusPedido)
router.delete('/:id',eliminarPedido)


module.exports = router;