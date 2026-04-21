const UserModel = require('../../models/Authtentication/UserModel');
const { validatorRegister } = require('../../utils/ValidationController/validatorAuthtentication');
const AppError = require('../../utils/AppError');
const bcrypt = require('bcryptjs');

class RegisterController {
    register(req, res) {
        const data = req.body;
        const error = validatorRegister(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        const hashedPassword = bcrypt.hashSync(data.password, 10);

        UserModel.createUser(data.username, hashedPassword, data.role, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 201, 'User berhasil ditambahkan');
            }
        });
    }
}
module.exports = new RegisterController(); 