const Usuario = require('../models').Usuario;

/* Usuarios de ejemplo */
const USUARIOS = [
    new Usuario(1, 'Carlos Perez', 'CarlosPerez@test.com', '123456', 'Admin', true),
    new Usuario(2, 'Eduardo Montoya', 'EduardoMontoya@test.com', '123456', 'Chef', true),
    new Usuario(3, 'Nadia Torres', 'NadiaTorres@test.com', '123456', 'Chef', true),
    new Usuario(4, 'Alexis Ramirez', 'AlexisRamirez@test.com', '123456', 'Chef', true),
    new Usuario(5, 'Daniel Suarez', 'DanielSuarez@test.com', '123456', 'Chef', true),
    new Usuario(6, 'Carla Robles', 'CarlaRobles@test.com', '123456', 'Chef', false),
    new Usuario(7, 'Adilene Pedroza', 'AdilenePedroza@test.com', '123456', 'Mesero', true),
    new Usuario(8, 'Ana Perez', 'AnaPerez@test.com', '123456', 'Mesero', true),
    new Usuario(9, 'Cesar Loera', 'CesarLoera@test.com', '123456', 'Mesero', true),
    new Usuario(10, 'Alejandro Jimenez', 'AlejandroJimenez@test.com', '123456', 'Mesero', true),
    new Usuario(11, 'Daniel Llanos', 'DanielLlanos@test.com', '123456', 'Mesero', true),
    new Usuario(12, 'Carlos Montoya', 'CarlosMontoya@test.com', '123456', 'Mesero', true),
    new Usuario(13, 'Julio Montoya', 'JulioMontoya@test.com', '123456', 'Mesero', false),
    new Usuario(14, 'Andres Vargas', 'AndresVargas@test.com', '123456', 'Cliente', true),
    new Usuario(15, 'Citlali Llamas', 'CitlaliLlamas@test.com', '123456', 'Cliente', true),
    new Usuario(16, 'Hugo Perez', 'HugoPerez@test.com', '123456', 'Cliente', true),
    new Usuario(17, 'Octavio Ramirez', 'OctavioRamirez@test.com', '123456', 'Cliente', true),
    new Usuario(18, 'Jorge Vizcaino', 'JorgeVizcaino@test.com', '123456', 'Cliente', true),
    new Usuario(19, 'Odin Martinez', 'OdinMartinez@test.com', '123456', 'Cliente', true),
    new Usuario(20, 'Alejandra Martinez', 'AlejandraMartinez@test.com', '123456', 'Cliente', false)
];
/* Usuarios de ejemplo */

/* 
{
    "id":20,
    "nombre":"Alejandra Martinez",
    "correo":"AlejandraMartinez@test.com",
    "password":"123456",
    "tipo":"Cliente",
    "estatus": false
}

 */

const iniciarSesion = (req, res) => {
    let { correo, password } = req.body;
    let user = USUARIOS.filter(usuario => usuario.correo === correo && usuario.password === password);
    if (!!user[0]) {
        res.status(200).send(user[0]);
    } else {
        res.status(401).send({ errorMessage: 'Unauthorized: Correo o password incorrecto' });
    }
}

const cerrarSesion = (req, res) => {
    res.status(200).send({ message: 'Sesion cerrada' });
    /* 
    OJO: Esta función se puso para el cierre de sesión, pero después pensamos en 
    que no se necesita ya que el cierre de sesión es sólo limpiar el token del 
    navegador y se hace en el cliente.
    */
}

const registrarse = (req, res) => {
    let newUsuario = new Usuario(req.body);
    console.log(newUsuario);
    //USUARIOS.push(newUsuario)
    res.status(200).send(newUsuario);
}

const verUsuarios = (req, res) => {
    res.status(200).send(USUARIOS);
}

const verUsuario = (req, res) => {
    let { id } = req.params;
    let user = USUARIOS.filter(usuario => usuario.id === +id);
    if (!!user[0]) {
        res.status(200).send(user[0]);
    } else {
        res.status(400).send({ errorMessage: 'Not Found: No existe el usuario' });
    }
}

const filtrar = (req, res) => {
    let campo = Object.keys(req.body)[0];
    let valor = req.body[campo]
    let users = USUARIOS.filter(user => user[campo] === valor);

    if (!!users[0]) {
        res.status(200).send(userEdited);
    } else {
        res.status(404).send({ errorMessage: 'Not Found: No se encontró al usuario' });
    }
}

const editar = (req, res) => {
    let datos = req.body;
    let userEdited = null;
    for (let i = 0; i <= USUARIOS.length; i++) {
        if (USUARIOS[i].id === datos.id) {
            for (campo in datos) {
                USUARIOS[i][campo] = datos[campo];
                userEdited = USUARIOS[i];
                break;
            }
        }
    }

    if (!!userEdited) {
        res.status(200).send(userEdited);
    } else {
        res.status(404).send({ errorMessage: 'Not Found: No se encontró al usuario' });
    }
}

const cambiarRol = (req, res) => {
    let { id, tipo } = req.body
    let userEdited = null;
    for (let i = 0; i <= USUARIOS.length; i++) {
        if (USUARIOS[i].id === id) {
            userEdited = USUARIOS[i];
            userEdited.tipo = tipo;
            break;
        }
    }
    if (!!userEdited) {
        res.status(200).send(userEdited);
    } else {
        res.status(404).send({ errorMessage: 'Not Found: No se encontró al usuario' });
    }
}

const cambiarEstatus = (req, res) => {
    let userEdited = null;
    let { id, estatus } = req.body;
    for (let i = 0; i <= USUARIOS.length; i++) {
        if (USUARIOS[i].id === id) {
            userEdited = USUARIOS[i];
            userEdited.status = estatus;
            break;
        }
    }
    if (!!userEdited) {
        res.status(200).send(userEdited);
    } else {
        res.status(404).send({ errorMessage: 'Not Found: No se encontró al usuario' });
    }
}

module.exports = {
    iniciarSesion,
    cerrarSesion,
    registrarse,
    verUsuarios,
    verUsuario,
    filtrar,
    editar,
    cambiarRol,
    cambiarEstatus
}