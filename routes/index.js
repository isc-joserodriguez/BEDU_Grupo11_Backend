// importamos las dependencias necesarias
var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('api-Restaurante');
});

router.use('/productos', require('./productos'));

// exportamos nuestro nuevo router
module.exports = router;