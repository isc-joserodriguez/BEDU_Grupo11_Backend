# BEDU | Grupo 11

## Contenido

- [Postwork Sesión 03](https://github.com/joanrodriguezhe/BEDU_Grupo11_Backend/tree/postWorks/postwork-sesion03-models)
- [Postwork Sesión 05](https://github.com/joanrodriguezhe/BEDU_Grupo11_Backend/tree/postWorks/postwork-sesion05)
- [Postwork Sesión 06](https://github.com/joanrodriguezhe/BEDU_Grupo11_Backend/tree/postWorks/postwork-sesion06)
- [Proyecto Final - API-RESTaurant](https://bedu-api-restaurante.herokuapp.com/v1)
  - [Objetivo](#objetivo)
  - [Desarrollo](#desarrollo)
  - [Historias de Usuario](#historias-de-usuario)
  - [Entregables](#entregables)
- [Autores](#autores)

<a name="objetivo"></a>

## Objetivo
- Desarrollo de una API con las siguientes características:
  - Como tema abierto, decidimos hacer la API para un restaurante.
  - base de datos poblada con al menos 50 registros cada uno con un id.
  - Como mínimo la API debe tener el CRUD completo con los siguientes servicios:
    - Servicio para crear un nuevo registro en la base.
    - Servicio para eliminar un registro.
    - Servicio para modificar un registro, se debe de considerar los casos de modificaciones por atributo, es decir, si los registros tienen un atributo nombre el servicio debe ser capaz de solo modificar el nombre. Así como una modificación total, es decir, de todos los atributos. Se recomienda definir servicios por separado para cada caso.
    - Consulta por id.
    - Consulta de todos los registros.
    - Consulta por coincidencia de atributos, es decir, si los registros tienen un campo nombre, el servicio debe ser capaz de regresar todos los registros que compartan el nombre. Y esto debe funcionar en general para todos los campos de la base.
    - Servicio de consulta de todos los registros, limitado a un número determinado por el cliente.
    - Servicio de consulta por campos, es decir, un servicio que solo regrese los campos que se piden por el usuario.
  - La API se debe desarrolar en Node.js
  - Utilizar un ORM/ODM para la conexión con la base de datos.
  - Hacer deploy de la API usando Heroku.

<a name="desarrollo"></a>

## Desarrollo

### Herramientas usadas

#### Meet
Se hizo usó de Meet de Google para la gestión del desarrollo en las sesiones de trabajo.

#### Slack
Esta herramienta se usó compartir los recursos más relevantes y como medio de comunicación

#### Live Share
Extensión de Visual Studio Code para compartir sesiones de código en tiempo real y edición colaborativa.

#### Trello
Gestión de tareas entre los miembros del equipo con la integración de GitHub

#### Git
Uso del versionado de git con GitHub para la gestión del proyecto

#### Node.js
Entorno de ejecución de JS para el desarrollo de la APi

#### Express
Framework web de backend para node diseñado para la creación de web apps y APIs.

#### Heroku
Plataforma como un servicio que permite a los desarrolladores contruir, correr y operar aplicciones completamente en la nube.

#### Swagger
Conjunto de herramientas para diseñar, construir, documentar y utilizar servicios web RESTful

#### MongoDB/Mongoose
Base de datos NoSQL y ODM para la conexión con Node.js

<a name="historias-de-usuario"></a>

## Historias de Usuario

### Administrador

#### Autenticación

Como administrador, quiero iniciar sesión en el sistema para poder hacer uso de él.

Como administrador, quiero cerrar sesión para que mi usuario no tenga acceso al sistema hasta volver a iniciar sesión.

##### Gestión de categorías de comida
Como administrador, quiero ver y filtrar las categorías para interactuar con los registros.

Como administrador, quiero añadir nuevas categorías para poder añadirlas a los productos.

Como administrador, quiero activar o desactivar categorías para evitar o permitir que los clientes puedan pedir productos que pertenezcan a esa categoría.

Como administrador, quiero editar las categorías para corregir o ajustar sus propiedades.

#### Gestión de comida
Como administrador, quiero ver y filtrar los productos para interactuar con los registros.

Como administrador, quiero añadir nuevos productos para que los clientes puedan comprarlos.

Como administrador, quiero activar o desactivar productos para evitar o permitir que los clientes puedan pedirlos.

Como administrador, quiero editar los productos para corregir o ajustar sus propiedades.

##### Gestión de pedidos
Como administrador, quiero crear un pedido para un cliente registrado.

Como administrador, quiero ver un pedido específico para interactuar con el registro.

Como administrador, quiero filtrar pedidos para interactuar con los registros.

Como administrador, quiero editar un pedido para cambiar sus atributos.

Como administrador, quiero poder cambiar el estado de de un pedido acorde a los estados válidos del estado actual.

Como administrador, quiero cancelar un pedido pendiente para que no se realice.

Como administrador, quiero eliminar un pedido cancelado para que no se vea en el historial.

Como administrador, quiero ver el historial de mis pedidos acorde a una cantidad de pedidos dada para poder ver estadísticas.

#### Gestión de usuarios
Como administrador, quiero ver y filtrar a los usuarios para interactuar con los registros.

Como administrador, quiero activar y desactivar a un usuario para restringir su acceso al sistema.

Como administrador, quiero registrar a un nuevo usuario para añadir nuevos meseros o clientes no registrados.

Como administrador, quiero editar el rol de un usuario para poder asignar a un mesero como chef o a un chef como mesero.

### Cliente
#### Autenticación
Como cliente, quiero iniciar sesión en el sistema para poder hacer uso de él.

Como cliente, quiero registrarme en el sistema para poder iniciar sesión.

Como cliente, quiero cerrar sesión para que mi usuario no tenga acceso al sistema hasta volver a iniciar sesión.

#### Gestión de pedidos propios
Como cliente, quiero crear un pedido para poder ser atendido.

Como cliente, quiero ver un pedido específico para poder interactuar con el registro.

Como cliente quiero poder filtrar mis pedidos para interactuar con los registros.

Como cliente, quiero editar uno de mis pedidos pendientes para cambiar sus atributos.

Como cliente, quiero cancelar  uno de mis pedidos pendientes para que no se realice.

Como cliente, quiero ver el historial de mis pedidos acorde a una cantidad de pedidos dada para poder ver estadísticas.

#### Ver/filtrar categorías y productos
Como cliente, quiero ver un productos o una categorías de productos para poder crear mi pedido.

Como cliente, filtrar productos y categorías de productos para poder crear mi pedido.

### Mesero

#### Autenticación
Como mesero, quiero iniciar sesión en el sistema para poder hacer uso de él.

Como mesero, quiero cerrar sesión para que mi usuario no tenga acceso al sistema hasta volver a iniciar sesión.

#### Gestión de pedidos de usuarios

Como mesero, quiero editar uno de mis pedidos pendientes de un cliente registrado.

Como mesero, quiero cancelar  uno de mis pedidos pendientes de un cliente registrado.

Como mesero, quiero ver un pedido específico para poder interactuar con el registro.

Como mesero quiero poder filtrar mis pedidos para interactuar con los registros.

Como mesero, quiero poder ver mis órdenes listas para poder entregarlas.

Como mesero, quiero ver el historial de mis pedidos acorde a una cantidad de pedidos dada para poder ver estadísticas.

#### Ver/filtrar categorías y productos

Como mesero, quiero ver un productos o una categoría de productos para poder conocer el menú.

Como mesero, filtrar productos y categorías de productos para poder conocer el menú.

### Chef

#### Gestión de pedidos

Como chef, quiero ver un pedido para interactuar con el registro.

Como chef, quiero filtrar mis pedidos para interactuar con los registros.

Como chef, quiero cambiar el estado de un pedido para la visualización del cliente y el mesero. (En preparación, Terminado)

Como chef, quiero ver el historial de mis pedidos acorde a una cantidad de pedidos dada para poder ver estadísticas.

#### Ver/filtrar productos
Como cliente, quiero ver un productos para poder conocer el menú.

Como cliente, filtrar productos para poder conocer el menú.

<a name="entregables"></a>

## Entregables

- [Reposiorio](https://github.com/joanrodriguezhe/BEDU_Grupo11_Backend)
- [Video en YouTube](https://youtu.be/2r2hJyf2w6s)
- [API en Heroku](https://bedu-api-restaurante.herokuapp.com/v1/)
  - Variables de Entorno
  ```
  MONGO_URI = URI de Conexión
  NODE_ENV = producción/development
  PORT = Puerto
  SECRET = secret
  ```
- [Documentación de Swagger](https://bedu-api-restaurante.herokuapp.com/api-docs/)
  - Token de administrador (Expira en 60 días)
  ```
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGFlNGFlYmNjYjEyN2JlNTg3ODYwNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidHlwZSI6ImFkbWluIiwic3RhdHVzIjoxLCJleHAiOjE2MjA3MDEzNDIsImlhdCI6MTYxNTUyMDk0Mn0.eyG0uKldOy8bQC7RvOach1t369BzHi1WW_io97AxY-o
  ```
- [Tabla de Trello](https://trello.com/b/9SiK8HwQ/bedu)

<a name="autores"></a>

## Autores

- ##### [Adrian-BT](https://github.com/Adrian-BT)
- ##### [NathalyNDC](https://github.com/NathalyNDC)
- ##### [joanrodriguezhe](https://github.com/joanrodriguezhe)
