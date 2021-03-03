--Creación de base de datos
CREATE DATABASE apirestaurante;
--Ponemos en uso la base
USE apirestaurante;
--Creamos tabla de usuario
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    tipo INT NOT NULL,
    estatus BOOLEAN NOT NULL
);
--Creamos tabla de Categoria_producto
CREATE TABLE categoria_producto (
    id_categoria_producto INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(70) NOT NULL,
    estatus BOOLEAN NOT NULL
);
--Creamos tabla de producto
CREATE TABLE producto (
    id_producto INT NOT NULL,
    id_categoria INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(70) NOT NULL,
    costo DOUBLE NOT NULL,
    estatus BOOLEAN NOT NULL,
    PRIMARY KEY(id_producto),
    FOREIGN KEY(id_categoria) REFERENCES categoria_producto(id_categoria_producto)
);
--Creamos tabla de pedido
CREATE TABLE pedido (
    id_pedido INT NOT NULL,
    id_cliente INT NOT NULL,
    id_mesero INT,
    id_chef INT,
    costo DOUBLE NOT NULL,
    fecha DATE NOT NULL,
    estatus INT NOT NULL,
    PRIMARY KEY(id_pedido),
    FOREIGN KEY(id_cliente) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_mesero) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_chef) REFERENCES usuario(id_usuario)
);
--Creamos tabla intermedia Producto - Pedido
CREATE TABLE producto_pedido (
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    PRIMARY KEY(id_pedido, id_producto),
    FOREIGN KEY(id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY(id_producto) REFERENCES producto(id_producto)
);
describe categoria_producto;
describe pedido;
describe producto_pedido;
describe producto;
describe usuario;