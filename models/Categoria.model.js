const mongoose = require('mongoose');  // exportacion de mongoose
const uniqueValidator = require('mongoose-unique-validator'); //Importando módulo mongoose-unique-validator, pendiente de instalar.

//Definiendo cada campo con sus tipo sde datos y las validaciones sobre este.
const CategoriaSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: [true, 'no puede estar vacío'], index: true, },
  description: { type: String, required: [true, 'no puede estar vacío'] },
  status: { type: Number, default: 1 }
},
  { timestamps: true }
);


// usando plugin de validación para que no se repitan correos ni usernames
CategoriaSchema.plugin(uniqueValidator, { message: 'Ya existe' });
mongoose.model('Categoria', CategoriaSchema);    //Define el modelo Usuario, utilizando el esquema UsuarioSchema.