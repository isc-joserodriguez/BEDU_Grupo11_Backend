const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        //unique: true, //este campo no se puede repetir
        required: [true, 'no puede estar vacío'],
        match: [/^[a-zA-Z0-9]+$/, "es inválido"],
        index: true,
    },
    id_categoria: { type: Number, required: true },
    descripcion: {
        type: String,
        required: [true, 'no puede estar vacío'],
        index: true,
    },
    costo: {
        type: Number,
        required: [true, 'no puede estar vacío'],
    },
    estatus: { type: Number },
},
    { timestamps: true }
);

// usando plugin de validación para que no se repitan correos
ProductoSchema.plugin(uniqueValidator, { message: 'Ya existe ese producto' });


ProductoSchema.methods.publicData = function () {
    return {
        id: this.id,
        nombre: this.nombre,
        id_categoria: this.id_categoria,
        descripcion: this.descripcion,
        costo: this.costo,
        estatus: this.estatus,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};


mongoose.model('Producto', ProductoSchema);


/*
//Clase que representa un producto de venta en el restaurante
class Producto {
    constructor({id, nombre, id_categoria, descripcion, costo, estatus}) {
        this.id = id;
        this.nombre = nombre;
        this.id_categoria = id_categoria;
        this.descripcion = descripcion;
        this.costo = costo;
        this.estatus = estatus ;
    }
}

//Exportar modelo
module.exports = Producto;
*/