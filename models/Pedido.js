//Clase de pedido para poder instanciar nuevos objetos de este tipo
class Pedido {
    constructor({id, id_cliente, info_productos, costo, estatus,fecha=new Date()}) {
        this.id = id;
        this.id_cliente = id_cliente;
        this.info_productos = info_productos;
        this.costo = costo;
        this.estatus = estatus;
        this.fecha = fecha;
    }
    
}
//Exportar modelo
module.exports = Pedido;