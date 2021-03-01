# BEDU | Grupo 11

---

## Contenido

- [Postwork Fase 02 Módulo 02 Sesión 03](./postwork-sesion03-models)
- [Proyecto Final - API-RESTaurant](./)
  - [Controllers](#Controllers)
    - [categoria_producto](#categoria_producto_controller)
    - [pedido](#pedido_controller)
    - [producto](#producto_controller)
    - [usuario](#usuario_controller)
  - [Models](#Models)
    - [categoria_producto](#categoria_producto_model)
    - [pedido](#pedido_model)
    - [producto](#producto_model)
    - [usuario](#usuario_model)
  - [Routes](#Routes)
    - [categoria_producto](#categoria_producto_route)
    - [pedido](#pedido_route)
    - [producto](#producto_route)
    - [usuario](#usuario_route)
  - [Ejemplos](#Examples)
    - [categoria_producto](#categoria_producto_example)
      - [Nuevo](#categoria_producto_example_new)
      - [Ver todos](#categoria_producto_example_getAll)
      - [Ver por ID](#categoria_producto_example_getById)
      - [Editar](#categoria_producto_example_edit)
      - [Cambiar Estatus](#categoria_producto_example_changeStatus)
      - [Filtrar](#categoria_producto_example_filter)
    - [pedido](#pedido_example)
      - [Nuevo](#pedido_example_new)
      - [Ver todos](#pedido_example_getAll)
      - [Ver por ID](#pedido_example_getById)
      - [Editar](#pedido_example_edit)
      - [Cambiar Estatus](#pedido_example_changeStatus)
      - [Filtrar](#pedido_example_filter)
      - [Eliminar](#pedido_example_delete)
    - [producto](#producto_example)
      - [Nuevo](#producto_example_new)
      - [Ver todos](#producto_example_getAll)
      - [Ver por ID](#producto_example_getById)
      - [Editar](#producto_example_edit)
      - [Cambiar Estatus](#producto_example_changeStatus)
      - [Filtrar](#producto_example_filter)
      - [Eliminar](#producto_example_delete)
    - [usuario](#usuario_example)
      - [Registrarse](#usuario_example_new)
      - [Iniciar sesión](#usuario_example_login)
      - [Cerrar sesión](#usuario_example_logout)
      - [Ver todos](#usuario_example_getAll)
      - [Ver por ID](#usuario_example_getById)
      - [Editar](#usuario_example_edit)
      - [Cambiar Estatus](#usuario_example_changeStatus)
      - [Cambiar Rol](#usuario_example_changeRole)
      - [Filtrar](#usuario_example_filter)
- [Autores](#autores)
<!-- - [Video Proyecto](https://youtu.be/etMsdDg5bM4) -->

<a name="Controllers"></a>

### Controllers

<a name="categoria_producto_controller"></a>

#### categoria_producto

```js
const crearCategoria_producto = (req, res) => {
  // Instanciaremos una nueva categoria utilizando la clase categoria_producto
  let categoria_producto = new Categoria_producto(req.body);

  if (!!categoria_producto.id) {
    //Validar si la nueva categoria tiene id
    CATEGORIAS.push(categoria_producto); //agregar al arreglo
    res.status(201).send(categoria_producto); //enviarla como respuesta al ser exitosa la llamada
  } else {
    res
      .status(304)
      .send({ Message: "Not Modified: No se agregó producto vacío" }); //ya que no se pueden agregar vacios se envia al siguiente mensaje
  }
};

const verCategorias = (req, res) => {
  res.status(200).send(CATEGORIAS); //envia todos los datos de categorias
};

const verCategoria = (req, res) => {
  let { id } = req.params;
  let categoria = CATEGORIAS.filter((categoria) => categoria.id === +id); //Filtra la categoría con cierto id
  if (!!categoria[0]) {
    res.status(200).send(categoria[0]);
  } else {
    res.status(400).send({ errorMessage: "Not Found: No existe el usuario" });
  }
};

const editarCategoria_producto = (req, res) => {
  // toda la informacion necesaria va en req.body
  let datos = req.body;
  let categoria_productoEdited = null; //variable para guardar la categoria editada
  for (let i = 0; i < CATEGORIAS.length; i++) {
    if (CATEGORIAS[i].id === datos.id) {
      //cuando encuentre la categoria acorde a su id
      for (campo in datos) {
        CATEGORIAS[i][campo] = datos[campo]; //cambia el valor de la propiedad del objeto indicado por el nuevo
        categoria_productoEdited = CATEGORIAS[i]; //guarda este objeto modificado para ser mostrado en la respuesta
      }
    }
  }
  if (categoria_productoEdited) {
    res.status(200).send(categoria_productoEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: Categoría no encontrada" });
  }
};

const cambiarEstatusCategoria_producto = (req, res) => {
  let categoria_productoEdited = null; //variable para guardar la categoria editada
  for (let i = 0; i < CATEGORIAS.length; i++) {
    if (CATEGORIAS[i].id === req.body.id) {
      //cuando encuentre la categoria acorde a su id
      CATEGORIAS[i].estatus = req.body.estatus; //se cambia el estatus de la seleccion acorde al estatus nuevo que se le envia
      categoria_productoEdited = CATEGORIAS[i]; //guarda el objeto
    }
  }
  if (categoria_productoEdited) {
    res.status(200).send(categoria_productoEdited);
  } else {
    res.status(404).send({ errorMessage: "Not found" });
  }
};

const filtrarCategoria_producto = (req, res) => {
  let campo = Object.keys(req.body)[0]; //toma el nombre de la propiedad del objeto por la que se va a filtrar
  let dato = req.body[campo]; //guarda el valor de esta propiedad (valor a buscar)
  let categoriasFiltradas = CATEGORIAS.filter((categoria) => {
    let regex = new RegExp(dato, "gi"); //utiliza expresion regular para hacer busqueda global e ignorar capitalizacion de letras
    return regex.test(categoria[campo]);
  });
  if (!!categoriasFiltradas[0]) {
    res.status(200).send(categoriasFiltradas); //muestra resultados encontrados
  } else {
    res
      .status(404)
      .send({ errorMessage: "NotFound: Busqueda no arrojó resultados" });
  }
};
```

<a name="pedido_controller"></a>

#### pedido

```js
const crearPedido = (req, res) => {
  // Instanciaremos un nuevo pedido utilizando la clase pedido
  let pedido = new Pedido(req.body);
  if (!!pedido.id) {
    //Validar si el nuevo pedido tiene id
    PEDIDOS.push(pedido); //agregar al arreglo
    res.status(201).send(pedido); //enviarlo como respuesta al ser exitosa la llamada
  } else {
    res
      .status(304)
      .send({ Message: "Not Modified: No se agregó producto vacío" }); //ya que no se pueden agregar vacios se envia al siguiente mensaje
  }
};

const verPedido = (req, res) => {
  //envia los datos del pedido seleccionado
  let pedidoSelected = null;
  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === +req.params.id) {
      //busca por id, el + es para convertir el id
      pedidoSelected = PEDIDOS[i]; //cuando lo encuentra lo guarda para mostrarlo como info
      break;
    }
  }
  if (pedidoSelected) {
    res.status(200).send(pedidoSelected);
  } else {
    res.status(404).send({ errorMessage: "Pedido no encontrado" });
  }
};

const verHistorialPedido = (req, res) => {
  res.status(200).send(PEDIDOS); //envia todos los datos de pedidos
};

const editarPedido = (req, res) => {
  // simulando un pedido previamente existente que el cliente modifica
  let { id, info_productos } = req.body; //guarda el id del pedido a editar y su arreglo de objetos de productos
  let pedidoEdited = null; //variable para guardar el pedido editado
  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === id) {
      //cuando encuentre el pedido acorde a su id
      PEDIDOS[i].info_productos = info_productos; //cambia el valor indicado por el nuevo
      pedidoEdited = PEDIDOS[i]; //guarda este objeto modificado para ser mostrado en la respuesta
      break;
    }
  }
  if (pedidoEdited) {
    res.status(200).send(pedidoEdited);
  } else {
    res.status(404).send({ errorMessage: "Not Found: Pedido no encontrado." });
  }
};
//aqui aplica nuestro Cancelar(){}
const cambiarEstatusPedido = (req, res) => {
  //ACTIVOS=1, CANCELADOS=0
  let pedidoEdited = null; //variable para guardar el pedido editado
  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === req.body.id) {
      //cuando encuentre el pedido acorde a su id
      PEDIDOS[i].estatus = req.body.estatus; //modifica para poner el nuevo estatus
      pedidoEdited = PEDIDOS[i]; //guarda el objeto para ser mostrado en la respuesta
      break;
    }
  }
  if (pedidoEdited) {
    res.status(200).send(pedidoEdited);
  } else {
    res.status(404).send({ errorMessage: "Not found" });
  }
};

const filtrarPedido = (req, res) => {
  let campo = Object.keys(req.body)[0]; //Obtiene el nombre del campo para filtrar
  let dato = req.body[campo]; //Obtiene el valor por el que se va a filtrar
  let pedidos = PEDIDOS.filter((pedido) => {
    let noEncontrado = true; //Se crea una variable temporal para determinar si fue encontrado algún producto
    pedido.info_productos.forEach((producto) => {
      //En cada pedido, revisa los productos
      let regex = new RegExp(dato, "gi"); //Crea una expresión regular para evaluar
      noEncontrado = noEncontrado && !regex.test(producto[campo]); //Evalua el campo del producto a filtrar con la expresión regular.
      //Se hace un AND para que con la primera iteración que encuentre, no cambie el resultado en las siguientes iteraciones
    });
    return !noEncontrado;
  });

  if (!!pedidos[0]) {
    //Si no encuentra ningun pedido, regresa un error
    res.status(200).send(pedidos);
  } else {
    res
      .status(404)
      .send({ errorMessage: "NotFound: Busqueda no arrojó resultados" });
  }
};

const eliminarPedido = (req, res) => {
  let pedidoEliminado = null; //aqu'i guardara' la info del eliminado
  let encontrado = false;

  for (let i = 0; i < PEDIDOS.length; i++) {
    if (PEDIDOS[i].id === +req.params.id) {
      //cuando encuentre el pedido acorde a su id
      if (!PEDIDOS[i].estatus) pedidoEliminado = PEDIDOS.splice(i, 1); //si el pedido est'a cancelado (estatus=0) se eliminara del arreglo y se guarda su info
      encontrado = true; //cambia bandera a encontrado
      break;
    }
  }
  if (!!pedidoEliminado) {
    //si hay un eliminado
    res.status(200).send(pedidoEliminado[0]); //se muestra como parte de la respuesta
  } else if (encontrado) {
    //fue encontrado pero no eliminado
    res.status(409).send({
      errorMessage: "Conflict: No se puede eliminar un pedido no cancelado",
    });
  } else {
    //no encontrado
    res
      .status(404)
      .send({ errorMessage: "Not found: No se encontró el pedido" });
  }
};
```

<a name="producto_controller"></a>

#### producto

```js
//Crear producto nuevo
const crearProducto = (req, res) => {
  let producto = new Producto(req.body);
  if (!!producto.id) {
    //Validar si el nuevo producto tiene id
    PRODUCTOS.push(producto); //Agregar nuevo producto
    res.status(201).send(producto); //Mensaje producto gregado
  } else {
    res
      .status(304)
      .send({ Message: "Not Modified: No se agregó producto vacío" }); //Mensaje error
  }
};

//Eliminar producto
const eliminarProducto = (req, res) => {
  let productoEncontrado = null;
  let encontrado = false;
  for (let i = 0; i < PRODUCTOS.length; i++) {
    //Para cada elemento dentro del arreglo
    if (PRODUCTOS[i].id === +req.params.id) {
      //Buscar dentro de los productos por id
      if (!PRODUCTOS[i].estatus) {
        //Si está inactivo, se cancela
        productoEncontrado = PRODUCTOS[i]; //Asignar a variable producto encontrado
        PRODUCTOS.splice(i, 1); //Eliminar producto del arreglo
      }
      encontrado = true;
      break;
    }
  }
  if (productoEncontrado) {
    res.status(200).send(productoEncontrado); //Mensaje producto eliminado
  } else if (encontrado) {
    res.status(409).send({
      errorMessage: "Conflict: No se puede eliminar un producto activo",
    });
  } else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: Producto no encontrado." }); //Mensaje error: no encontrado
  }
};

//Cambiar estatus de producto
const cambiarEstatusProducto = (req, res) => {
  //INACTIVO = 0    ACTIVO =1
  let productoEncontrado = null;
  for (let i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].id === req.body.id) {
      //Buscar dentro de los productos por id
      productoEncontrado = PRODUCTOS[i]; //Asigna el producto que coincide
      PRODUCTOS[i].estatus = req.body.estatus; //Cambiar estatus
      break;
    }
  }

  if (productoEncontrado) {
    res.status(200).send(productoEncontrado);
  } //Mensaje estatus actualizado
  else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: Producto no encontrado." });
  } //Mensaje error
};

//Editar producto
const editarProducto = (req, res) => {
  let productoEncontrado = null;
  let datos = req.body;
  for (let i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].id === datos.id) {
      //Buscar dentro de los productos por id
      for (campo in datos) {
        PRODUCTOS[i][campo] = datos[campo]; //Modificar valores
        productoEncontrado = PRODUCTOS[i];
      }
    }
  }
  if (productoEncontrado) {
    res.status(200).send(productoEncontrado);
  } //Mensaje producto modificado
  else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: Producto no encontrado." });
  } //Mensaje error
};

const verProducto = (req, res) => {
  let productoSeleccionado = null;
  for (let i = 0; i < PRODUCTOS.length; i++) {
    //Buscar dentro de los productos por id
    if (PRODUCTOS[i].id === +req.params.id) {
      productoSeleccionado = PRODUCTOS[i];
      break;
    }
  }
  if (productoSeleccionado !== null) {
    //Retornar producto encontrado
    res.send(productoSeleccionado);
  } else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: Producto no encontrado." }); //Mensaje error
  }
};

//Mostrar todos los productos
const verProductos = (req, res) => {
  res.status(200).send(PRODUCTOS);
};

//Filtrar productos
const filtrarProducto = (req, res) => {
  let campo = Object.keys(req.body)[0]; //Obtener campo del objeto
  let valor = req.body[campo]; //Obtener el contenido del campo

  let productosFiltrados = PRODUCTOS.filter((producto) => {
    //Crear nuevo arreglo con los articulos que coinciden
    let regex = new RegExp(valor, "gi"); //Expresion regular que ignora mayusculas/minusculas
    return regex.test(producto[campo]); //Verificar coincidencia
  });

  if (!!productosFiltrados[0]) {
    res.status(200).send(productosFiltrados); //Retorno de productos filtrados
  } else {
    res
      .status(404)
      .send({ errorMessage: "NotFound: Busqueda no arrojó resultados" }); //Mensaje error
  }
};
```

<a name="usuario_controller"></a>

#### usuario

```js
const iniciarSesion = (req, res) => {
  let { correo, password } = req.body; //Declara variables para correo y password
  let user = USUARIOS.filter(
    (usuario) => usuario.correo === correo && usuario.password === password
  ); //Filtra al usuario con esas credenciales
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
  let newUsuario = new Usuario(req.body); //Crea el nuevo usuario por desestructuración

  if (!!newUsuario.id) {
    //Si se envía un body vacío, no crea nada y regresa un error
    USUARIOS.push(newUsuario);
    res.status(200).send(newUsuario);
  } else {
    res
      .status(304)
      .send({ Message: "Not Modified: No se agregó producto vacío" });
  }
};

const verUsuarios = (req, res) => {
  //Regresa todos los usuarios
  res.status(200).send(USUARIOS);
};

const verUsuario = (req, res) => {
  let { id } = req.params;
  let user = USUARIOS.filter((usuario) => usuario.id === +id); //Filtra al usuario con cierto id
  if (!!user[0]) {
    res.status(200).send(user[0]);
  } else {
    res.status(400).send({ errorMessage: "Not Found: No existe el usuario" });
  }
};

const filtrar = (req, res) => {
  let campo = Object.keys(req.body)[0]; //Obtiene el nombre del campo para filtrar
  let valor = req.body[campo]; //Obtiene el valor por el que se va a filtrar
  let users = USUARIOS.filter((user) => {
    let regex = new RegExp(valor, "gi"); //Crea una expresión regular para evaluar
    return regex.test(user[campo]); //Evalua el campo del usuario a filtrar con la expresión regular
  });

  if (!!users[0]) {
    //Si no encuentra ningun usuario, regresa un error
    res.status(200).send(users);
  } else {
    res
      .status(404)
      .send({ errorMessage: "NotFound: Busqueda no arrojó resultados" });
  }
};

const editar = (req, res) => {
  let datos = req.body;
  let userEdited = null;
  for (let i = 0; i < USUARIOS.length; i++) {
    if (USUARIOS[i].id === +datos.id) {
      //Busca el usuario por id
      for (campo in datos) {
        //Se hace un for in para obtener cada campo del body
        USUARIOS[i][campo] = datos[campo]; //Se hace el cambio en el array por cada campo que reciba el body
        userEdited = USUARIOS[i]; //Asignamos el nuevo Array para validar al final
      }
      break; //Una vez encontrado, salimos del for
    }
  }

  if (!!userEdited) {
    //Si se editó, se regresa envía el registro nuevo. Si no, manda error
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
    //Busca el usuario
    if (USUARIOS[i].id === id) {
      USUARIOS[i].tipo = tipo; //Se le asigna el nuevo valor
      userEdited = USUARIOS[i]; //Se guarda para validar después
      break;
    }
  }
  if (!!userEdited) {
    //Si se editó se regresa el nuevo registro, si no regresa un error.
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
    //Busca el usuario
    if (USUARIOS[i].id === id) {
      USUARIOS[i].estatus = estatus; //Se le asigna el nuevo valor
      userEdited = USUARIOS[i]; //Se guarda para validar después
      break;
    }
  }
  if (!!userEdited) {
    //Si se editó se regresa el nuevo registro, si no regresa un error.
    res.status(200).send(userEdited);
  } else {
    res
      .status(404)
      .send({ errorMessage: "Not Found: No se encontró al usuario" });
  }
};
```

<a name="Models"></a>

### Models

<a name="categoria_producto_model"></a>

#### categoria_producto

```js
class Categoria_producto {
  constructor({ id, nombre, descripcion, estatus }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estatus = estatus;
  }
}
```

<a name="pedido_model"></a>

#### pedido

```js
class Pedido {
  constructor({
    id,
    id_cliente,
    info_productos,
    costo,
    estatus,
    fecha = new Date(),
  }) {
    this.id = id;
    this.id_cliente = id_cliente;
    this.info_productos = info_productos;
    this.costo = costo;
    this.estatus = estatus;
    this.fecha = fecha;
  }
}
```

<a name="producto_model"></a>

#### producto

```js
class Producto {
  constructor({ id, nombre, id_categoria, descripcion, costo, estatus }) {
    this.id = id;
    this.nombre = nombre;
    this.id_categoria = id_categoria;
    this.descripcion = descripcion;
    this.costo = costo;
    this.estatus = estatus;
  }
}
```

<a name="usuario_model"></a>

#### usuario

```js
class Usuario {
  constructor({ id, nombre, correo, password, tipo, estatus }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.password = password;
    this.tipo = tipo;
    this.estatus = estatus;
  }
}
```

<a name="Routes"></a>

### Routes

<a name="categoria_producto_route"></a>

#### categoria_producto

```js
router.get("/", verCategorias);
router.get("/:id", verCategoria);
router.post("/filtrar", filtrarCategoria_producto);
router.post("/", crearCategoria_producto);
router.put("/editar", editarCategoria_producto);
router.put("/cambiarEstatus", cambiarEstatusCategoria_producto);
```

<a name="pedido_route"></a>

#### pedido

```js
router.get("/:id", verPedido);
router.get("/", verHistorialPedido);
router.post("/filtrar", filtrarPedido);
router.post("/", crearPedido);
router.put("/editar", editarPedido);
router.put("/cambiarEstatus", cambiarEstatusPedido);
router.delete("/:id", eliminarPedido);
```

<a name="producto_route"></a>

#### producto

```js
router.get("/:id", verProducto);
router.get("/", verProductos);
router.post("/filtrar", filtrarProducto);
router.post("/", crearProducto);
router.put("/cambiarEstatus", cambiarEstatusProducto);
router.put("/editar", editarProducto);
router.delete("/:id", eliminarProducto);
```

<a name="usuario_route"></a>

#### usuario

```js
router.post("/login", iniciarSesion);
router.get("/logout", cerrarSesion);
router.post("/signup", registrarse);
router.get("/", verUsuarios);
router.get("/:id", verUsuario);
router.post("/filtrar", filtrar);
router.put("/edit", editar);
router.put("/changeRole", cambiarRol);
router.put("/toggleEstatus", cambiarEstatus);
```

<a name="Examples"></a>

### Ejemplos

<a name="categoria_producto_example"></a>

#### categoria_producto

<a name="categoria_producto_example_new"></a>

##### Nuevo

`POST: http://localhost:3000/v1/categoria_producto/`

Body:

```json
{
  "id": 777,
  "nombre": "Comidas rápidas",
  "descripcion": "Es la cat de Comidas rápidas",
  "estatus": 1
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/categoriasNew.png)

<a name="categoria_producto_example_getAll"></a>

##### Ver todos

`GET: http://localhost:3000/v1/categoria_producto/`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/categoriasGetAll.png)

<a name="categoria_producto_example_getById"></a>

##### Ver por ID

`GET: http://localhost:3000/v1/categoria_producto/2`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/categoriasGetById.png)

<a name="categoria_producto_example_edit"></a>

##### Editar

`PUT: http://localhost:3000/v1/categoria_producto/editar`

Body:

```json
{
  "id": 1,
  "nombre": "Jugos",
  "descripcion": "Es la cat de Jugos",
  "estatus": 0
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/categoriasEdit.png)

<a name="categoria_producto_example_changeStatus"></a>

##### Cambiar Estatus

`PUT: http://localhost:3000/v1/categoria_producto/cambiarEstatus`

Body:

```json
{
  "id": 1,
  "estatus": 0
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/categoriasChangeStatus.png)

<a name="categoria_producto_example_filter"></a>

##### Filtrar

`POST: http://localhost:3000/v1/categoria_producto/filtrar/`

Body:

```json
{
  "nombre": "sodas"
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/categoriasFilter.png)

<a name="pedido_example"></a>

#### pedido

<a name="pedido_example_new"></a>

##### Nuevo

`POST: http://localhost:3000/v1/pedido/`

Body:

```json
{
  "id": 777,
  "id_cliente": 777,
  "info_productos": [
    {
      "id": 1,
      "nombre": "Limonada",
      "id_categoria": 1,
      "descripcion": "Limonada de limon",
      "estatus_disponibilidad": 1,
      "cantidad": 1,
      "notas": "Sin semilla"
    }
  ],
  "costo": "$60",
  "estatus": 1
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/pedidosNew.png)

<a name="pedido_example_getAll"></a>

##### Ver todos

`GET: http://localhost:3000/v1/pedido/`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/pedidosGetAll.png)

<a name="pedido_example_getById"></a>

##### Ver por ID

`GET: http://localhost:3000/v1/pedido/1`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/pedidosGetById.png)

<a name="pedido_example_edit"></a>

##### Editar

`PUT: http://localhost:3000/v1/pedido/editar`

Body:

```json
{
  "id": 1,
  "info_productos": [
    {
      "id": 10,
      "nombre": "Manzana",
      "id_categoria": 1,
      "descripcion": "Manzana",
      "estatus_disponibilidad": 1,
      "cantidad": 1,
      "notas": "Sin semilla"
    }
  ]
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/pedidosEdit.png)

<a name="pedido_example_changeStatus"></a>

##### Cambiar Estatus

`PUT: http://localhost:3000/v1/pedido/cambiarEstatus`

Body:

```json
{
  "id": 1,
  "estatus": 0
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/pedidosChangeStatus.png)

<a name="pedido_example_filter"></a>

##### Filtrar

`PUT: http://localhost:3000/v1/pedido/cambiarEstatus`

Body:

```json
{
  "id": 1,
  "estatus": 0
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/pedidosFilter.png)

<a name="pedido_example_delete"></a>

##### Eliminar

`DELETE: http://localhost:3000/v1/pedido/2`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/pedidosDelete.png)

<a name="producto_example"></a>

#### producto

<a name="producto_example_new"></a>

##### Nuevo

`POST: http://localhost:3000/v1/productos/`

Body:

```json
{
  "id": 777,
  "nombre": "Coca-Cola",
  "id_categoria": 1,
  "descripcion": "Refresco sabor cola",
  "costo": 20,
  "estatus": 1
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/productosNew.png)

<a name="producto_example_getAll"></a>

##### Ver todos

`GET: http://localhost:3000/v1/productos/`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/productosGetAll.png)

<a name="producto_example_getById"></a>

##### Ver por ID

`POST: http://localhost:3000/v1/productos/2`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/productosGetById.png)

<a name="producto_example_edit"></a>

##### Editar

`PUT: http://localhost:3000/v1/productos/editar`

Body:

```json
{
  "id": 1,
  "nombre": "Coca-Cola",
  "id_categoria": 1,
  "descripcion": "Refresco sabor cola",
  "costo": 20,
  "estatus": 1
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/productosEdit.png)

<a name="producto_example_changeStatus"></a>

##### Cambiar Estatus

`PUT: http://localhost:3000/v1/productos/cambiarEstatus`

Body:

```json
{
  "id": 3,
  "estatus": 0
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/productosChangeStatus.png)

<a name="producto_example_filter"></a>

##### Filtrar

<a name="producto_example_delete"></a>

`POST: http://localhost:3000/v1/productos/filtrar`

Body:

```json
{
  "nombre": "jugo"
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/productosFilter.png)

##### Eliminar

`DELETE: http://localhost:3000/v1/productos/3`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/productosDelete.png)

<a name="usuario_example"></a>

#### usuario

<a name="usuario_example_new"></a>

##### Registrarse

`POST: http://localhost:3000/v1/usuarios/signup/`

Body:

```json
{
  "id": 777,
  "nombre": "Pedro Soza",
  "correo": "PedroSoza@test.com",
  "password": "123456",
  "tipo": "Cliente",
  "estatus": 1
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosNew.png)

<a name="usuario_example_login"></a>

##### Iniciar sesión

`POST: http://localhost:3000/v1/usuarios/login/`

Body:

```json
{
  "correo": "CarlaRobles@test.com",
  "password": "123456"
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosLogin.png)

<a name="usuario_example_logout"></a>

##### Cerrar sesión

`GET: http://localhost:3000/v1/usuarios/logout/`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosLogout.png)

<a name="usuario_example_getAll"></a>

##### Ver todos

`GET: http://localhost:3000/v1/usuarios/`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosGetAll.png)

<a name="usuario_example_getById"></a>

##### Ver por ID

`GET: http://localhost:3000/v1/usuarios/1`

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosGetById.png)

<a name="usuario_example_edit"></a>

##### Editar

`PUT: http://localhost:3000/v1/usuarios/edit`

Body:

```json
{
  "id": 13,
  "nombre": "Pedro Soza",
  "correo": "PedroSoza@test.com"
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosEdit.png)

<a name="usuario_example_changeStatus"></a>

##### Cambiar Estatus

`PUT: http://localhost:3000/v1/usuarios/toggleEstatus`

Body:

```json
{
  "id": 13,
  "estatus": 1
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosChageStatus.png)

<a name="usuario_example_changeRole"></a>

##### Cambiar Rol

`PUT: http://localhost:3000/v1/usuarios/changeRole`

Body:

```json
{
    "id":13,
    "tipo":"Admin"
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosChageRole.png)

<a name="usuario_example_filter"></a>

##### Filtrar

`PUT: http://localhost:3000/v1/usuarios/filtrar`

Body:

```json
{
  "tipo":"Mesero"
}
```

![Mockup](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/docs/img/usuariosFilter.png)

<a name="autores"></a>

## Autores

- ##### [Adrian-BT](https://github.com/Adrian-BT)
- ##### [NathalyNDC](https://github.com/NathalyNDC)
- ##### [EAeliasalejandro](https://github.com/EAeliasalejandro)
- ##### [joanrodriguezhe](https://github.com/joanrodriguezhe)

### [Ir a Repositorio](https://github.com/joanrodriguezhe/BEDU_Grupo11_Backend)

### [Ir a tablero de Trello](https://trello.com/b/9SiK8HwQ/bedu)
