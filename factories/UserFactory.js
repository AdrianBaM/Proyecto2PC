const User = require('../models/User');

class UserFactory {
    static createUser(id, nombre, telefono) {
        return new User(id, nombre, telefono);
    }
}

module.exports = UserFactory;