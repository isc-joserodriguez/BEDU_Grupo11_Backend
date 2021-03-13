//Instanciamos una nueva variable de Express
const router = require('express').Router();
const auth = require('../middlewares/auth');

//Importamos los métodos del controlador
const {
    iniciarSesion,
    registrarse,
    verUsuarios,
    verUsuario,
    filtrar,
    editar,
    cambiarRol,
    cambiarEstatus
} = require('../controllers/usuario.controller');

//Asignamos las rutas para cada método
router.post('/login', iniciarSesion);
router.post('/signup', registrarse);

router.get('/', auth.requerido, verUsuarios);
router.get('/:id', auth.requerido, verUsuario);
router.post('/filtrar', auth.requerido, filtrar);
router.put('/changeRole/:id', auth.requerido, cambiarRol);
router.put('/toggleEstatus/:id', auth.requerido, cambiarEstatus);
router.put('/:id', auth.requerido, editar);

module.exports = router;