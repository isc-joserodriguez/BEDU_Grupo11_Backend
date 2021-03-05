## Postwork Sesión 06

Realicen los siguientes ejercicios sobre su proyecto del módulo:

1. Implementen la base de datos de su proyecto utilizando MongoDB.
   ![BD](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion06/capturasMongo/bd.png)

2. Discutan en equipo las siguientes preguntas y escriban las conclusiones a las que llegaron en un archivo para entregar:

- ¿Cuáles son las ventajas de usar el modelo relacional en nuestro proyecto?
- ¿Cuáles son las limitantes de usar el modelo relacional en nuestro proyecto?
- ¿Qué ventajas ofrece el modelo no relacional a nuestro proyecto?
- ¿Qué desventajas tiene el uso del modelo no relacional en nuestro proyecto?
- ¿Qué implementación de base de datos de las que hicimos representa mejor las especificaciones de las entidades del proyecto y por qué?

3. Después de elegir el modelo de base de datos que mejor se acopla a las necesidades de su proyecto, comiencen a poblar su Base de datos. Recuerden que deben de tener un total de 50 registros. Solo es necesario poblar la base de datos con el modelo que usaran.
4. Dependiendo de su información, hagan al menos 5 consultas complejas a su base de datos.
   - Agregar el id del mesero/chef que atenderá el pedido con id 3
     ```js
     db.pedidos.updateOne({ _id: 3 }, { $set: { id_mesero: 7 } });
     ```
   - Consultar los pedidos de diciembre 2020
     ```js
     db.pedidos.find({
       fecha: { $gte: ISODate("2020-12-01"), $lt: ISODate("2020-12-31") },
     });
     ```
   - Cambiar la categoria de un producto
     ```js
     db.productos.updateOne({ _id: 7 }, { $set: { id_categoria: 6 } });
     ```
   - Agregar un producto a los pedidos con costo mayor a 100
     ```js
     db.pedidos.updateMany(
       { costo: { $gte: 100 } },
       { $push: { info_productos: 5 } }
     );
     ```
   - Consultar un pedido cancelado que tenga menos de 3 productos
     ```js
     db.pedidos.find({ estatus: 0, "info_productos.3": { $exists: false } });
     ```
   - Agregarle a todos los productos 5 pesos por impuestos
     ```js
     db.productos.updateMany({}, { $inc: { costo: 5 } });
     ```
