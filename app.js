// Importamos las bibliotecas necesarias
require('dotenv').config();

let express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors');
// Objeto global de la app
let app = express();

// configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*********************** Mongoose Configuration *******************************/
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI
);
mongoose.set('debug', true);
require('./models/Usuario.model');
require('./config/passport');
// Aquí se importarán los modelos Mascota y Solicitud cuando estén listos

/*********************** Mongoose Configuration *******************************/


// Agregamos el código de nuestro router (routes/index.js)
app.use('/v1', require('./routes'));

// Manejando los errores 404
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
let server = app.listen(process.env.PORT || 3000, function () {
  console.log('Escuchando en el puerto ' + server.address().port);
});