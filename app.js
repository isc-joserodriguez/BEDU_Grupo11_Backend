// Importamos las bibliotecas necesarias
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = process.env.NODE_ENV === 'production' ? require('./swagger') : require('./swagger.dev'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');

require('dotenv').config();
require('./models/Usuario.model');
require('./models/Categoria.model');
require('./models/Producto.model');
require('./models/Pedido.model');
require('./config/passport');

// Objeto global de la app
let app = express();

// configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Conexión a Mongo
mongoose.connect(
  process.env.MONGO_URI
);
/* mongoose.set('debug', true); */

// Agregamos el código de nuestro router (routes/index.js)
app.use('/v1', require('./routes'));
//Agregamos el swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Manejando los errores 404
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
let server = app.listen(process.env.PORT || 3001, function () {
  console.log('Escuchando en el puerto ' + server.address().port);
});