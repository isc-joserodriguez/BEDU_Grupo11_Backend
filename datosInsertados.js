//use ApiRestaurante
db.usuarios.insertMany(
    [
        { "firstName": "admin", "lastName": "admin", "email": "admin@admin.com", "password": "admin", "type": "admin" },
        { "firstName": "mesero", "lastName": "mesero", "email": "mesero@mesero.com", "password": "mesero", "type": "mesero" },
        { "firstName": "chef", "lastName": "chef", "email": "chef@chef.com", "password": "chef", "type": "chef" },
        { "firstName": "cliente", "lastName": "cliente", "email": "cliente@cliente.com", "password": "cliente", "type": "cliente" },
        { "firstName": "Carlos", "lastName": "Perez", "email": "CarlosPerez@test.com", "password": "123456", "type": "admin" },
        { "firstName": "Eduardo", "lastName": "Montoya", "email": "EduardoMontoya@test.com", "password": "123456", "type": "chef" },
        { "firstName": "Nadia", "lastName": "Torres", "email": "NadiaTorres@test.com", "password": "123456", "type": "chef" },
        { "firstName": "Alexis", "lastName": "Ramirez", "email": "AlexisRamirez@test.com", "password": "123456", "type": "chef" },
        { "firstName": "Daniel", "lastName": "Suarez", "email": "DanielSuarez@test.com", "password": "123456", "type": "chef" },
        { "firstName": "Carla", "lastName": "Robles", "email": "CarlaRobles@test.com", "password": "123456", "type": "chef" },
        { "firstName": "Adilene", "lastName": "Pedroza", "email": "AdilenePedroza@test.com", "password": "123456", "type": "mesero" },
        { "firstName": "Ana", "lastName": "Perez", "email": "AnaPerez@test.com", "password": "123456", "type": "mesero" },
        { "firstName": "Cesar", "lastName": "Loera", "email": "CesarLoera@test.com", "password": "123456", "type": "mesero" },
        { "firstName": "Alejandro", "lastName": "Jimenez", "email": "AlejandroJimenez@test.com", "password": "123456", "type": "mesero" },
        { "firstName": "Daniel", "lastName": "Llanos", "email": "DanielLlanos@test.com", "password": "123456", "type": "mesero" },
        { "firstName": "Carlos", "lastName": "Montoya", "email": "CarlosMontoya@test.com", "password": "123456", "type": "mesero" },
        { "firstName": "Julio", "lastName": "Montoya", "email": "JulioMontoya@test.com", "password": "123456", "type": "mesero" },
        { "firstName": "Andres", "lastName": "Vargas", "email": "AndresVargas@test.com", "password": "123456", "type": "cliente" },
        { "firstName": "Citlali", "lastName": "Llamas", "email": "CitlaliLlamas@test.com", "password": "123456", "type": "cliente" },
        { "firstName": "Hugo", "lastName": "Perez", "email": "HugoPerez@test.com", "password": "123456", "type": "cliente" },
        { "firstName": "Octavio", "lastName": "Ramirez", "email": "OctavioRamirez@test.com", "password": "123456", "type": "cliente" },
        { "firstName": "Jorge", "lastName": "Vizcaino", "email": "JorgeVizcaino@test.com", "password": "123456", "type": "cliente" },
        { "firstName": "Odin", "lastName": "Martinez", "email": "OdinMartinez@test.com", "password": "123456", "type": "cliente" },
        { "firstName": "Alejandra", "lastName": "Martinez", "email": "AlejandraMartinez@test.com", "password": "123456", "type": "cliente" },
    ]
)

db.categorias.insertMany(
    [
        { "id": "604d7d6e45a6de761e3d91ba", "name": "Desayuno", "description": "Es la categoria de desayunos servida de 7-9am" },
        { "id": "604d7d8445a6de761e3d91bb", "name": "Jugo", "description": "Es la categoria de jugos naturales" },
        { "id": "604d7d955a59af77150d7e9b", "name": "Soda", "description": "Es la categoria de refrescos" },
        { "id": "604d7d9b5a59af77150d7e9c", "name": "Comida", "description": "Es la categoria de comidas" },
        { "id": "604d7da35a59af77150d7e9d", "name": "Postre", "description": "Es la categoria de postres" },
        { "id": "604d7daa5a59af77150d7e9e", "name": "Cena", "description": "Es la categoria de cenas" }
    ]
)

db.productos.insertMany([
    { "id": "604d801d22885b79ebd38297", "name": "Chilaquiles", "idCategoria": "604d7d6e45a6de761e3d91ba", "description": "Chilaquiles con pollo en salsa verde y queso doble crema", "cost": 75 },
    { "id": "604d803722885b79ebd38298", "name": "Jugo de naranja", "idCategoria": "604d7d8445a6de761e3d91bb", "description": "Jugo de naranja 500 ml", "cost": 30 },
    { "id": "604d807c1cad697a4c8bb043", "name": "Sprite", "idCategoria": "604d7d955a59af77150d7e9b", "description": "Sprite en lata 355ml", "cost": 20 },
    { "id": "604d80911cad697a4c8bb044", "name": "Huevos al gusto", "idCategoria": "604d7d6e45a6de761e3d91ba", "description": "Huevos al gusto (omelette, revueltos, estrellados)", "cost": 60 },
    { "id": "604d809f1cad697a4c8bb045", "name": "Jugo de mandarina", "idCategoria": "604d7d8445a6de761e3d91bb", "description": "Jugo de mandarina 500 ml", "cost": 30 },
    { "id": "604d80ae1cad697a4c8bb046", "name": "Mirinda", "idCategoria": "604d7d955a59af77150d7e9b", "description": "Mirinda en lata 355ml", "cost": 20 },
    { "id": "604d80bd1cad697a4c8bb047", "name": "Molletes", "idCategoria": "604d7d6e45a6de761e3d91ba", "description": "Molletes con queso manchego (2 piezas)", "cost": 50 },
    { "id": "604d80cf1cad697a4c8bb048", "name": "Jugo de betabel", "idCategoria": "604d7d8445a6de761e3d91bb", "description": "Jugo de betabel 500 ml", "cost": 30 },
    { "id": "604d80e21cad697a4c8bb049", "name": "Manzanita Sol", "idCategoria": "604d7d955a59af77150d7e9b", "description": "Manzanita Sol en lata 355ml", "cost": 20 }
])

db.pedidos.insertMany([
    { "idCliente": 14, "info": [1, 3], "cost": 120},
    { "idCliente": 16, "info": [4, 5], "cost": 75},
    { "idCliente": 20, "info": [5, 2, 1], "cost": 90},
    { "idCliente": 14, "info": [5, 1], "cost": 60},
    { "idCliente": 18, "info": [1, 8], "cost": 120},
    { "idCliente": 17, "info": [7, 1, 4, 7], "cost": 75},
    { "idCliente": 19, "info": [2, 4, 6, 3, 8], "cost": 90},
]);