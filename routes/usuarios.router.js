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
router.post('/login', iniciarSesion);//listo
router.post('/signup',auth.opcional, registrarse);//listo

router.get('/', auth.requerido, verUsuarios);//listo
router.get('/:id', auth.requerido, verUsuario);//listo
router.post('/filtrar', auth.requerido, filtrar);//listo
router.put('/cambiarTipo/:id', auth.requerido, cambiarRol); //listo
router.put('/cambiarEstatus/:id', auth.requerido, cambiarEstatus);//listo
router.put('/editar/:id', auth.requerido, editar);//listo

module.exports = router;