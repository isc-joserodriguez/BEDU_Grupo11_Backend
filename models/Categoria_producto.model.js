//Clase de categoria_producto para poder instanciar nuevos objetos de este tipo
class Categoria_producto {
    constructor({id, nombre, descripcion, estatus}) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estatus = estatus;
    }
}
//Exportar modelo
module.exports = Categoria_producto;