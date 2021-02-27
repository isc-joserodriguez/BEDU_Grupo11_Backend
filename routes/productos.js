// Estructura del CRUD
const router = require('express').Router();
const {
    crearProducto,
    eliminarProducto,
    desactivarProducto,
    activarProducto,
    editarProducto,
    verProducto,
    filtrarProducto
} = require('../controllers/producto')

router.get('/', verProducto)
router.post('/', crearProducto)
router.put('/:id', editarProducto)
router.delete('/:id', eliminarProducto)

router.put('/:id', desactivarProducto)
router.put('/:id', activarProducto)

router.get('/', filtrarProducto)

module.exports = router;