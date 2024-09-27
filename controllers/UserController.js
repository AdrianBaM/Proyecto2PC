const UserFactory = require('../factories/UserFactory');
const UserView = require('../views/UserView');
const db = require('../db');

class UserController {
    static getAllUsers(req, res) {
        db.query('SELECT * FROM proyectos', (error, results) => {
            if (error) {
                console.error('Error al consultar la base de datos:', error);
                res.status(500).json({ error: 'Error en el servidor' }); // Cambiado a JSON
                return;
            }

            function formatDate(dateString) {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0'); 
                const month = String(date.getMonth() + 1).padStart(2, '0'); 
                const year = date.getFullYear();
            
                return `${day}/${month}/${year}`; 
            }
            
            const date = '2022-01-01T06:00:00.000Z';
            const formattedDate = formatDate(date);

            const users = results.map(user => {
                return UserFactory.createUser(user.id, user.nombre, user.telefono, user.dpi, user.correo, formatDate(user.fechaNacimiento), user.tipoSangre, formatDate(user.inicioContrato), formatDate(user.finContrato));
            });

            res.json(users);
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
