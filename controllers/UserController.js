// controllers/UserController.js
const UserFactory = require('../factories/UserFactory');
const UserView = require('../views/UserView');
const db = require('../db'); 

class UserController {
    static getAllUsers(req, res) {
        
        db.query('SELECT * FROM proyectos', (error, results) => {
            if (error) {
                console.error('Error al consultar la base de datos:', error);
                res.status(500).send('Error en el servidor');
                return;
            }

            const users = results.map(user => {
                const userObj = UserFactory.createUser(user.id, user.nombre, user.telefono);
                return UserView.displayUser(userObj);
            });

            res.send(users.join(''));
        });
    }
}

module.exports = UserController;
