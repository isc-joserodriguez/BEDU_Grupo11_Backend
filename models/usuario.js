class Usuario {
    constructor(id, nombre, correo, password, tipo, estatus) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.tipo = tipo;
        this.estatus = estatus;
    }
}

module.exports = Usuario;