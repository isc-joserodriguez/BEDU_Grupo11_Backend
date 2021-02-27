//Clase que representa un producto de venta en el restaurante
class Producto {
    constructor(id, nombre, id_categoria, descripcion, estatus_disponibilidad) {
        this.id = id;
        this.nombre = nombre;
        this.id_categoria = id_categoria;
        this.descripcion = descripcion;
        this.costo = costo;
        this.estatus_disponibilidad = estatus_disponibilidad;
    }

}

module.exports = Producto;