// Estructura del CRUD
const router = require('express').Router();

const {
    crearProducto,
    eliminarProducto,
    cambiarEstatusProducto,
    editarProducto,
    verProducto,
    verProductos,
    filtrarProducto
} = require('../controllers/producto')

router.get('/:id', verProducto)
router.get('/', verProductos)
router.get('/filtrar', filtrarProducto)
router.post('/', crearProducto)
router.put('/cambiarEstatus', cambiarEstatusProducto)
router.put('/editar', editarProducto)
router.delete('/:id', eliminarProducto)

module.exports = router;