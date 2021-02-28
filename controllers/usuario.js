const Usuario = require("../models").Usuario;

/* Usuarios de ejemplo */
const USUARIOS = [
  new Usuario({
    id: 1,
    nombre: "Carlos Perez",
    correo: "CarlosPerez@test.com",
    password: "123456",
    tipo: "Admin",
    estatus: true,
  }),
  new Usuario({
    id: 2,
    nombre: "Eduardo Montoya",
    correo: "EduardoMontoya@test.com",
    password: "123456",
    tipo: "Chef",
    estatus: true,
  }),
  new Usuario({
    id: 3,
    nombre: "Nadia Torres",
    correo: "NadiaTorres@test.com",
    password: "123456",
    tipo: "Chef",
    estatus: true,
  }),
  new Usuario({
    id: 4,
    nombre: "Alexis Ramirez",
    correo: "AlexisRamirez@test.com",
    password: "123456",
    tipo: "Chef",
    estatus: true,
  }),
  new Usuario({
    id: 5,
    nombre: "Daniel Suarez",
    correo: "DanielSuarez@test.com",
    password: "123456",
    tipo: "Chef",
    estatus: true,
  }),
  new Usuario({
    id: 6,
    nombre: "Carla Robles",
    correo: "CarlaRobles@test.com",
    password: "123456",
    tipo: "Chef",
    estatus: false,
  }),
  new Usuario({
    id: 7,
    nombre: "Adilene Pedroza",
    correo: "AdilenePedroza@test.com",
    password: "123456",
    tipo: "Mesero",
    estatus: true,
  }),
  new Usuario({
    id: 8,
    nombre: "Ana Perez",
    correo: "AnaPerez@test.com",
    password: "123456",
    tipo: "Mesero",
    estatus: true,
  }),
  new Usuario({
    id: 9,
    nombre: "Cesar Loera",
    correo: "CesarLoera@test.com",
    password: "123456",
    tipo: "Mesero",
    estatus: true,
  }),
  new Usuario({
    id: 10,
    nombre: "Alejandro Jimenez",
    correo: "AlejandroJimenez@test.com",
    password: "123456",
    tipo: "Mesero",
    estatus: true,
  }),
  new Usuario({
    id: 11,
    nombre: "Daniel Llanos",
    correo: "DanielLlanos@test.com",
    password: "123456",
    tipo: "Mesero",
    estatus: true,
  }),
  new Usuario({
    id: 12,
    nombre: "Carlos Montoya",
    correo: "CarlosMontoya@test.com",
    password: "123456",
    tipo: "Mesero",
    estatus: true,
  }),
  new Usuario({
    id: 13,
    nombre: "Julio Montoya",
    correo: "JulioMontoya@test.com",
    password: "123456",
    tipo: "Mesero",
    estatus: false,
  }),
  new Usuario({
    id: 14,
    nombre: "Andres Vargas",
    correo: "AndresVargas@test.com",
    password: "123456",
    tipo: "Cliente",
    estatus: true,
  }),
  new Usuario({
    id: 15,
    nombre: "Citlali Llamas",
    correo: "CitlaliLlamas@test.com",
    password: "123456",
    tipo: "Cliente",
    estatus: true,
  }),
  new Usuario({
    id: 16,
    nombre: "Hugo Perez",
    correo: "HugoPerez@test.com",
    password: "123456",
    tipo: "Cliente",
    estatus: true,
  }),
  new Usuario({
    id: 17,
    nombre: "Octavio Ramirez",
    correo: "OctavioRamirez@test.com",
    password: "123456",
    tipo: "Cliente",
    estatus: true,
  }),
  new Usuario({
    id: 18,
    nombre: "Jorge Vizcaino",
    correo: "JorgeVizcaino@test.com",
    password: "123456",
    tipo: "Cliente",
    estatus: true,
  }),
  new Usuario({
    id: 19,
    nombre: "Odin Martinez",
    correo: "OdinMartinez@test.com",
    password: "123456",
    tipo: "Cliente",
    estatus: true,
  }),
  new Usuario({
    id: 20,
    nombre: "Alejandra Martinez",
    correo: "AlejandraMartinez@test.com",
    password: "123456",
    tipo: "Cliente",
    estatus: false,
  }),
];
/* Usuarios de ejemplo */

/* 
{
    "id":777,
    "nombre":"Pedro Soza",
    "correo":"PedroSoza@test.com",
    "password":"123456",
    "tipo":"Cliente",
    "estatus": false
}

 */

const iniciarSesion = (req, res) => {
  let { correo, password } = req.body;
  let user = USUARIOS.filter(
    (usuario) => usuario.correo === correo && usuario.password === password
  );
  if (!!user[0]) {
    res.status(200).send(user[0]);
  } else {
    res
      .status(401)
      .send({ errorMessage: "Unauthorized: Correo o password incorrecto" });
  }
};

const cerrarSesion = (req, res) => {
  res.status(200).send({ message: "Sesion cerrada" });
  /* 
    OJO: Esta función se puso para el cierre de sesión, pero después pensamos en 
    que no se necesita ya que el cierre de sesión es sólo limpiar el token del 
    navegador y se hace en el cliente.
    */
};

const registrarse = (req, res) => {
  let newUsuario = new Usuario(req.body);

  if (!!newUsuario.id) {
    USUARIOS.push(newUsuario);
    res.status(200).send(newUsuario);
  } else {
    res
      .status(304)
      .send({ Message: "Not Modified: No se agregó producto vacío" });
  }
};

const verUsuarios = (req, res) => {
  res.status(200).send(USUARIOS);
};

const verUsuario = (req, res) => {
  let { id } = req.params;
  let user = USUARIOS.filter((usuario) => usuario.id === +id);
  if (!!user[0]) {
    res.status(200).send(user[0]);
  } else {
    res.status(400).send({ errorMessage: "Not Found: No existe el usuario" });
  }
};

const filtrar = (req, res) => {
  let campo = Object.keys(req.body)[0];
  let valor = req.body[campo];
  let users = USUARIOS.filter((user) =>{
    let regex= new RegExp(valor, 'gi');
    return regex.test(user[campo]);
  });
  
  if(!!categoriasFiltradas[0]){
    res.status(200).send(productosFiltrados);
}else{
    res.status(404).send({errorMessage:'NotFound: Busqueda no arrojó resultados'});
}
};

const editar = (req, res) => {
  let datos = req.body;
  let userEdited = null;
  for (let i = 0; i < USUARIOS.length; i++) {
    if (USUARIOS[i].id === datos.id) {
      for (campo in datos) {
        USUARIOS[i][campo] = datos[campo];
        userEdited = USUARIOS[i];
      }
      break;
    }
  }

  if (!!userEdited) {
    res.status(200).send(userEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: No se encontró al usuario" });
  }
};

const cambiarRol = (req, res) => {
  let { id, tipo } = req.body;
  let userEdited = null;
  for (let i = 0; i < USUARIOS.length; i++) {
    if (USUARIOS[i].id === id) {
      userEdited = USUARIOS[i];
      userEdited.tipo = tipo;
      break;
    }
  }
  if (!!userEdited) {
    res.status(200).send(userEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: No se encontró al usuario" });
  }
};

const cambiarEstatus = (req, res) => {
  let userEdited = null;
  let { id, estatus } = req.body;
  for (let i = 0; i < USUARIOS.length; i++) {
    if (USUARIOS[i].id === id) {
      userEdited = USUARIOS[i];
      userEdited.estatus = estatus;
      break;
    }
  }
  if (!!userEdited) {
    res.status(200).send(userEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: No se encontró al usuario" });
  }
};

module.exports = {
  iniciarSesion,
  cerrarSesion,
  registrarse,
  verUsuarios,
  verUsuario,
  filtrar,
  editar,
  cambiarRol,
  cambiarEstatus,
};
