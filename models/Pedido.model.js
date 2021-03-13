const mongoose = require("mongoose"); // exportacion de mongoose

//Definiendo cada campo con sus tipo sde datos y las validaciones sobre este.
const PedidoSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.ObjectId,
      required: [true, "no puede estar vacío"],
      index: true,
    },
    chef: { type: mongoose.ObjectId, default: null },
    mesero: { type: mongoose.ObjectId, default: null },
    info: { type: Array, required: [true, "no puede estar vacío"] },
    cost: { type: Number, required: [true, "no puede estar vacío"] },
    status: { type: Number, required: [true, "no puede estar vacío"] },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Pedido", PedidoSchema); //Define el modelo Usuario, utilizando el esquema UsuarioSchema.
