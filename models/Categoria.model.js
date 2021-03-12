const mongoose = require('mongoose');  // exportacion de mongoose
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.

//Definiendo cada campo con sus tipo sde datos y las validaciones sobre este.
const CategoriaSchema = new mongoose.Schema({                   
name: {                                                  
  type: String,
  unique: true, //este campo no se puede repetir
  required: [true, "no puede estar vacío"],
  index: true,
},                                           
description: { type: String, required: [true, "no puede estar vacío"] },
status: {type: Number, required: [true, "no puede estar vacío"] }
},
{ timestamps: true }
);


CategoriaSchema.methods.publicData = function () {
    return {
        id: this.id,
        name: this.name,
        description: this.description,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};


// usando plugin de validación para que no se repitan correos ni usernames
CategoriaSchema.plugin(uniqueValidator, { message: "Ya existe" }); 
mongoose.model("Categoria", CategoriaSchema);    //Define el modelo Usuario, utilizando el esquema UsuarioSchema.