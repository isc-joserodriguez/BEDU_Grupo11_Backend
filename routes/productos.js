//Instanciamos una nueva variable de Express
const router = require("express").Router();

//Importar funciones del controlador
const {
  crearProducto,
  eliminarProducto,
  cambiarEstatusProducto,
  editarProducto,
  verProducto,
  verProductos,
  filtrarProducto,
} = require("../controllers/producto");

//Rutas definidas de las funciones
router.get("/:id", verProducto);
router.get("/", verProductos);
router.post("/filtrar", filtrarProducto);
router.post("/", crearProducto);
router.put("/cambiarEstatus", cambiarEstatusProducto);
router.put("/editar", editarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
