## Postwork Sesión05

Realicen los siguientes ejercicios sobre su proyecto del módulo:

1. Con base en las entidades definidas hasta ahora en tu proyecto, define el diagrama entidad relación de éstas.
   ![Diagrama](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion05/DiagramaER_Grupo11.png)
2. Traduzcan el diagrama del inciso anterior en un modelo relacional.
   ![Modelo](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion05/ModeloRelacional_Grupo11.png)
3. Implementen este modelo como una base de datos relacional en MySQL, guarden todos los comandos que usaron para la creación de la base de datos y tablas en un archivo con nombre `database.sql` y súbanlo a su repositorio.

   [database.sql](./database.sql)

4. Tomen un ScreenShot de la descripción de las tablas en su base de datos en MySQL. Recuerden que el comando para describir una tabla es:

## categoria_producto

![Diagrama](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion05/describesTables/categoria_producto.png)

## pedido

![Diagrama](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion05/describesTables/pedido.png)

## producto_pedido

![Diagrama](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion05/describesTables/producto_pedido.png)

## producto

![Diagrama](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion05/describesTables/producto.png)

## usuario

![Diagrama](https://raw.githubusercontent.com/joanrodriguezhe/BEDU_Grupo11_Backend/master/postwork-sesion05/describesTables/usuario.png) 

5. **Para reflexionar** 
- **¿El modelo relacional se acopla a las necesidades de su proyecto?**
  Sí puede acoplarse a nuestras necesidades, sin embargo tuvimos que hacer ciertas modificaciones a nuestros modelos para adaptarlos al modelo relacional.
- **¿Que le agregarían o quitarían para que funcionara mejor para sus necesidades?**
  Por ejemplo, nuestros modelos de Usuario y Pedido, al adaptarlo, tuvimos que manejar las relaciones multiples de diferentes tipos de usuarios que interactuan de manera independiente con el pedido, de tal forma que más adelante quizás nos veamos obligados a cambiar el modelo de usuarios para dividirlo por cada tipo de usuario haciendo que cada sea una entidad diferente a pesar de compartir los mismos atributos.
