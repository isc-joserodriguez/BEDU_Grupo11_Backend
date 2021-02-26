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
    USUARIOS.push(newUsuario)
    res.status(200).send(newUsuario);
}

const ver = (req, res) => {
    let { id } = req.body;
    let user = USUARIOS.filter(usuario => usuario.id === id);
    if (!!user[0]) {
        res.status(200).send(user[0]);
    } else {
        res.status(400).send({ errorMessage: 'Not Found: No existe el usuario' });
    }
}

const filtrar = (req, res) => {
    /* Recibe parametro y busqueda por la que va a buscar */
    let { valor, parametro } = req.body;
    let users = []
    switch (parametro) {
        case 'NOMBRE':
            users = USUARIOS.filter(user => user.nombre === valor);
            break;
        case 'CORREO':
            users = USUARIOS.filter(user => user.correo === valor);
            break;
        case 'TIPO':
            users = USUARIOS.filter(user => user.tipo === valor);
            break;
        case 'ESTATUS':
            users = USUARIOS.filter(user => user.estatus === valor);
            break;
    }
    if (!!user[0]) {
        res.status(200).send(users);
    } else {
        res.status(400).send({ errorMessage: 'Not Found: Esa busqueda no arrojó usuarios' });
    }
}

const editar = (req, res) => {
    let datos= req.body;
    let userEdited = null;
    for (let i = 0; i <= USUARIOS.length; i++) {
        if (USUARIOS[i].id === datos.id) {
            for (campo in datos){
                USUARIOS[i][campo]=datos[campo];
                userEdited = USUARIOS[i];
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
    let userEdited = null;
    for (let i = 0; i <= USUARIOS.length; i++) {
        if (USUARIOS[i].id === req.params.id) {
            userEdited = USUARIOS[i];
            userEdited.tipo = req.body.tipo;
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
    for (let i = 0; i <= USUARIOS.length; i++) {
        if (USUARIOS[i].id === req.params.id) {
            userEdited = USUARIOS[i];
            userEdited.status = req.body.estatus;
        }
    }
    if (!!userEdited) {
        res.status(200).send(userEdited);
    } else {
        res.status(404).send({ errorMessage: 'Not Found: No se encontró al usuario' });
    }
}