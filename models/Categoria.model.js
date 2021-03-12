//Clase de categoria para poder instanciar nuevos objetos de este tipo
class Categoria {
    constructor({id, nombre, descripcion, estatus}) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estatus = estatus;
    }
}
//Exportar modelo
module.exports = Categoria;