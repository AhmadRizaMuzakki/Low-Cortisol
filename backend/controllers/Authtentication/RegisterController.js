const UserModel = require('../../models/Authtentication/UserModel');

class RegisterController {
    register(req, res) {
        const { username, password, role} = req.body;
        UserModel.createUser(username, password, role, (err, results) => {
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
}

module.exports = new RegisterController();