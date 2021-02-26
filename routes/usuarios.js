// Estructura del CRUD
const router = require('express').Router();
const {
    iniciarSesion,
    cerrarSesion,
    registrarse,
    verUsuarios,
    verUsuario,
    filtrar,
    editar,
    cambiarRol,
    cambiarEstatus
} = require('../controllers/usuario');

router.post('/login', iniciarSesion);
router.get('/logout', cerrarSesion)
router.post('/signin', registrarse)
router.get('/', verUsuarios)
router.get('/:id', verUsuario)
router.post('/filtrar', filtrar)
router.put('/edit', editar)
router.put('/changeRole', cambiarRol)
router.put('/toggleEstatus', cambiarEstatus)

/* router.get('/', obtenerUsuarios)
router.post('/', crearUsuario)
router.put('/:id', modificarUsuario)
router.delete('/:id', eliminarUsuario) */

module.exports = router;