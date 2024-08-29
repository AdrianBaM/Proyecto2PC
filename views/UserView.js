class UserView {
    static displayUser(user) {
        return `<p>User: ${user.nombre}, Telefono: ${user.telefono}</p>`;
    }
}

module.exports = UserView;
