const crypto = require('crypto');                             //Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken');                          //Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config').secret;                   // ????
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        unique: true, //este campo no se puede repetir
        lowercase: true,
        required: [true, 'no puede estar vacío'],
        match: [/\S+@\S+\.\S+/, 'es inválido'],
        index: true,
    },
    type: { type: String, enum: ['cliente', 'mesero', 'chef', 'admin'], default: 'cliente' },
    status: { type: Number, default: 1 },
    favs: { type: Array, default: [] },
    hash: String,
    salt: String
},
    { timestamps: true }
);

// usando plugin de validación para que no se repitan correos
UsuarioSchema.plugin(uniqueValidator, { message: 'Ya existe' });

UsuarioSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex'); // generando una 'sal' random para cada usuario
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex'); // generando un hash utilizando la sal
};

UsuarioSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

UsuarioSchema.methods.generarJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); // 60 días antes de expirar

    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email,
        type: this.type,
        status: this.status,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UsuarioSchema.methods.toAuthJSON = function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        type: this.type,
        status: this.status,
        token: this.generarJWT()
    };
};

mongoose.model('Usuario', UsuarioSchema);