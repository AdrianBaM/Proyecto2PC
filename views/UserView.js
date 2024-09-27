class UserView {
    static displayUser(user) {
        return `<p>User: ${user.nombre}, Telefono: ${user.telefono}, DPI: ${user.dpi}, Correo: ${user.correo}, Fecha Nacimiento: ${user.fechaNacimiento}, Tipo Sangre: ${user.tipoSangre}, Inicio Contrato: ${user.inicioContrato}, Fin Contrato: ${user.finContrato}</p>`;
    }
}

module.exports = UserView;
