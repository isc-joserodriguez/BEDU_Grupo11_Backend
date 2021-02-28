//Instanciamos una nueva variable de Express
const router = require('express').Router();
//Importamos los métodos del controlador
const {
  crearPedido,
  verPedido,
  verHistorialPedido,
  editarPedido,
  cambiarEstatusPedido,
  filtrarPedido,
  eliminarPedido
} = require('../controllers/pedido')

//Asignamos las rutas para cada método
router.get('/:id', verPedido)
router.get('/', verHistorialPedido)
router.post('/filtrar', filtrarPedido)
router.post('/', crearPedido)
router.put('/editar', editarPedido)
router.put('/cambiarEstatus', cambiarEstatusPedido)
router.delete('/:id',eliminarPedido)


module.exports = router;