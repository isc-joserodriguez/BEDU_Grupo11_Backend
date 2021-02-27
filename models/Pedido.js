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
module.exports = Pedido;