const UserFactory = require('../factories/UserFactory');
const UserView = require('../views/UserView');

class UserController {
    static getUser(req, res) {
        const user = UserFactory.createUser(1, 'Adrian Barragan', '54908870');
        const userData = UserView.displayUser(user);
        res.send(userData);
    }
}

module.exports = UserController;