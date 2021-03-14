const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'no puede estar vacío'],
        index: true
    },
    idCategoria: { type: mongoose.ObjectId, required: true },
    description: {
        type: String,
        required: [true, 'no puede estar vacío'],
        index: true,
    },
    cost: {
        type: Number,
        required: [true, 'no puede estar vacío'],
    },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);

// usando plugin de validación para que no se repitan correos
ProductoSchema.plugin(uniqueValidator, { message: 'Ya existe ese producto' });


mongoose.model('Producto', ProductoSchema);


/*
//Clase que representa un producto de venta en el restaurante
class Producto {
    constructor({id, name, idCategoria, description, cost, status}) {
        this.id = id;
        this.name = name;
        this.idCategoria = idCategoria;
        this.description = description;
        this.cost = cost;
        this.status = status ;
    }
}

//Exportar modelo
module.exports = Producto;
*/