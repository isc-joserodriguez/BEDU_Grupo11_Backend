//Instanciamos una nueva variable de Express
const router = require('express').Router();

//Importamos los métodos del controlador
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

//Asignamos las rutas para cada método
router.post('/login', iniciarSesion);
router.get('/logout', cerrarSesion);
router.post('/signup', registrarse);
router.get('/', verUsuarios);
router.get('/:id', verUsuario);
router.post('/filtrar', filtrar);
router.put('/edit', editar);
router.put('/changeRole', cambiarRol);
router.put('/toggleEstatus', cambiarEstatus);

module.exports = router;