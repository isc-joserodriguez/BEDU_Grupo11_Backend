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
    image: { type: String }
},
    { timestamps: true }
);

// usando plugin de validación para que no se repitan correos
ProductoSchema.plugin(uniqueValidator, { message: 'Ya existe ese producto' });


mongoose.model('Producto', ProductoSchema);