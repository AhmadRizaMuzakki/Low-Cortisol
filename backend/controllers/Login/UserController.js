const UserModel = require('../../models/login/UserModel');

class UserController {
    index(req, res) {
        UserModel.getAllUsers((err, results) => {
            if(err){
                res.json({
                    message: 'error',
                    error: err.message,
                    data: []
                });
            }else{
                res.json({
                    message: 'success',
                    data: results
                });
            }
        });
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