class User {
    constructor(id, nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.dpi = dpi;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.tipoSangre = tipoSangre;
        this.inicioContrato = inicioContrato;
        this.finContrato = finContrato;
    }
}

module.exports = User;