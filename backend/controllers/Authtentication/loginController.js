const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/Authtentication/UserModel');
const { validatorLogin } = require('../../utils/ValidationController/validatorAuthtentication');
const AppError = require('../../utils/AppError');

class LoginController {
    login(req, res) {
        const data = req.body;
        const error = validatorLogin(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        UserModel.getAllUsers((err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (results.length === 0) {
                return AppError(res, 'User tidak ditemukan', 404, 'User tidak ditemukan');
            }
            const user = results.find(
                (user) => user.username === data.username && user.role === data.role
            );
            if (!user) {
                return AppError(res, 'User tidak ditemukan', 404, 'User tidak ditemukan');
            }
            const match = bcrypt.compareSync(data.password, user.password);
            if (!match) {
                return AppError(res, 'Password tidak valid', 400, 'Password tidak valid');
            }
            if (!process.env.JWT_SECRET) {
                return AppError(res, 'JWT_SECRET belum diset', 500, 'JWT_SECRET belum diset');
            }
            const token = jwt.sign(
                { id: user.id, role: user.role, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return AppError(res, { token }, 200, 'Login berhasil');
        });
    }
}
module.exports = new LoginController();