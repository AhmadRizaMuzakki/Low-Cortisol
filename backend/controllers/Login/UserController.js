class UserController {
    index(req, res) {
        res.send('Hello World');
    }
    store(req, res) {
        res.send('Hello World');
    }
    update(req, res) {
        res.send('Hello World');
    }
    destroy(req, res) {
        res.send('Hello World');
    }
    login(req, res) {
        res.send('Ini adalah endpoint login');
    }
}

module.exports = new UserController();