const User = require('../models/User');

class UserFactory {
    static createUser(id, nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato) {
        return new User(id, nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato);
    }
}

module.exports = UserFactory;