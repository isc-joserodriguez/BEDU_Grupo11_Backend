## Postwork Sesión 06

Realicen los siguientes ejercicios sobre su proyecto del módulo:

1. Implementen la base de datos de su proyecto utilizando MongoDB.
   ![BD](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/bd.png)

2. Discutan en equipo las siguientes preguntas y escriban las conclusiones a las que llegaron en un archivo para entregar:

- ¿Cuáles son las ventajas de usar el modelo relacional en nuestro proyecto?

    Actualmente hay muchos recursos disponible, debido a la larga trayectoria que tiene. Esto hace que esté estandarizado y que muchas veces cuando se llegan a tener problemas, puede ser fácil resolverlo consultando en la comunidad debido a que muchas veces ya está documentado.
- ¿Cuáles son las limitantes de usar el modelo relacional en nuestro proyecto?

    En nuestro caso, tuvimos que hacer ciertas modificaciones a nuestros modelos de Usuario y Pedido porque tenemos unas relaciones multiples para tipos de usuarios que interactuan de manera independiente con el pedido, de tal forma que la representación en el modelo relacional puede llegar a ser complicada o dificil de mantener.
- ¿Qué ventajas ofrece el modelo no relacional a nuestro proyecto?

    Tenemos más flexibilidad para trabajar con los pedidos debido a que no debemos preocuparnos de que el sistema nos agregue o no los ID de mesero o chef (ya que pensamos agregarlos una vez que uno de estos usuarios interactúe cpm el pedido). También las relaciones multiples que tenemos, pueden llegar a ser más fáciles de representar.
- ¿Qué desventajas tiene el uso del modelo no relacional en nuestro proyecto?

    Al no existir relaciones reales, puede llegar a ser complicado las consultas de las diferentes colecciones de datos.
- ¿Qué implementación de base de datos de las que hicimos representa mejor las especificaciones de las entidades del proyecto y por qué?

    Creemos que el modelo no relacional se adapta mejor a nuestro proyecto debido a las diferentes complicaciones que tuvimos con el relacional. Por otro lado, también nos permite trabajar con los diferentes campos sin necesidad de agregarlos todos y a la hora de consultar, no nos regresa los "campos vacíos" como null y en la implementación puede llegar a ser más sencillo el manejo de los datos.

3. Después de elegir el modelo de base de datos que mejor se acopla a las necesidades de su proyecto, comiencen a poblar su Base de datos. Recuerden que deben de tener un total de 50 registros. Solo es necesario poblar la base de datos con el modelo que usaran.
   [Datos ingresados](./datosInsertados.txt)
4. Dependiendo de su información, hagan al menos 5 consultas complejas a su base de datos.
   - Agregar el id del mesero/chef que atenderá el pedido con id 3
     ```js
     db.pedidos.updateOne({ _id: 3 }, { $set: { id_mesero: 7 } });
     ```
     ![1](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/1.png)
   - Consultar los pedidos de diciembre 2020
     ```js
     db.pedidos.find({
       fecha: { $gte: ISODate("2020-12-01"), $lt: ISODate("2020-12-31") },
     });
     ```
     ![2](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/2.png)
   - Cambiar la categoria de un producto
     ```js
     db.productos.updateOne({ _id: 7 }, { $set: { id_categoria: 6 } });
     ```
     ![3](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/3.png)
   - Agregar un producto a los pedidos con costo mayor a 100
     ```js
     db.pedidos.updateMany(
       { costo: { $gte: 100 } },
       { $push: { info_productos: 5 } }
     );
     ```
     ![4](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/4.png)
   - Consultar un pedido cancelado que tenga menos de 3 productos
     ```js
     db.pedidos.find({ estatus: 0, "info_productos.3": { $exists: false } });
     ```
     ![5](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/5.png)
   - Agregarle a todos los productos 5 pesos por impuestos
     ```js
     db.productos.updateMany({}, { $inc: { costo: 5 } });
     ```
     ![6](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/6.png)
