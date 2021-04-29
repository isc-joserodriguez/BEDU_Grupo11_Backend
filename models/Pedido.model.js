const mongoose = require("mongoose"); // exportacion de mongoose

//Definiendo cada campo con sus tipo sde datos y las validaciones sobre este.
const PedidoSchema = new mongoose.Schema(
    {
        idCliente: {
            type: mongoose.ObjectId,
            required: [true, "no puede estar vacío"],
            index: true,
        },
        idChef: { type: mongoose.ObjectId, default: null },
        idMesero: { type: mongoose.ObjectId, default: null },
        info: { type: Array, required: [true, "no puede estar vacío"] },
        cost: { type: Number, required: [true, "no puede estar vacío"] },
        image: { type: String },
        status: { type: Number, default: 1 }
        /*
        Status
        0 -Cancelado
        1 - Pendiete
        2 - Preparando
        3 - Preparado
        4 - Entregado
        */
    },
    {
        timestamps: true,
    }
);

mongoose.model("Pedido", PedidoSchema); //Define el modelo Usuario, utilizando el esquema UsuarioSchema.
