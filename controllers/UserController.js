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
                const userObj = UserFactory.createUser(
                    user.id, 
                    user.nombre, 
                    user.telefono, 
                    user.dpi, 
                    user.correo, 
                    user.fechaNacimiento, 
                    user.tipoSangre, 
                    user.inicioContrato, 
                    user.finContrato
                );
                return UserView.displayUser(userObj);
            });

            res.send(users.join(''));
        });
    }

    static createUser(req, res) {
        const { nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato } = req.body;

        const query = `
            INSERT INTO proyectos (nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato], (error, result) => {
            if (error) {
                console.error('Error al insertar en la base de datos:', error);
                res.status(500).send('Error en el servidor');
                return;
            }

            res.status(201).send('Usuario creado exitosamente');
        });
    }

    static updateUser(req, res) {
        const { id } = req.params;
        const { nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato } = req.body;

        const query = `
            UPDATE proyectos SET nombre = ?, telefono = ?, dpi = ?, correo = ?, fechaNacimiento = ?, tipoSangre = ?, inicioContrato = ?, finContrato = ? 
            WHERE id = ?`;

        db.query(query, [nombre, telefono, dpi, correo, fechaNacimiento, tipoSangre, inicioContrato, finContrato, id], (error, result) => {
            if (error) {
                console.error('Error al actualizar en la base de datos:', error);
                res.status(500).send('Error en el servidor');
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).send('Usuario no encontrado');
                return;
            }

            res.send('Usuario actualizado exitosamente');
        });
    }

    static deleteUser(req, res) {
        const { id } = req.params;

        const query = `DELETE FROM proyectos WHERE id = ?`;

        db.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error al eliminar en la base de datos:', error);
                res.status(500).send('Error en el servidor');
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).send('Usuario no encontrado');
                return;
            }

            res.send('Usuario eliminado exitosamente');
        });
    }
}

module.exports = UserController;
