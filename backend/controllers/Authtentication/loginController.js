const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/Authtentication/UserModel');
const { validatorLogin } = require('../../utils/ValidationController/validatorAuthtentication');
const AppError = require('../../utils/AppError');

function isBcryptHash(stored) {
    return /^\$2[aby]\$\d{2}\$/.test(String(stored || ''));
}

function normalizeStoredPassword(stored) {
    if (stored == null) return '';
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(stored)) {
        return stored.toString('utf8');
    }
    return String(stored);
}

function passwordMatches(plain, stored) {
    if (plain == null || stored == null) return false;
    const s = normalizeStoredPassword(stored);
    if (isBcryptHash(s)) {
        return bcrypt.compareSync(String(plain), s);
    }
    return String(plain) === s;
}

class LoginController {
    login(req, res) {
        const raw = req.body || {};
        const data = {
            username: String(raw.username || '').trim(),
            password: raw.password,
        };
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
            const user = results.find((u) => u.username === data.username);
            if (!user) {
                return AppError(res, 'User tidak ditemukan', 404, 'User tidak ditemukan');
            }
            if (!passwordMatches(data.password, user.password)) {
                return AppError(res, 'Password tidak valid', 400, 'Password tidak valid');
            }
            if (!process.env.JWT_SECRET) {
                return AppError(res, 'JWT_SECRET belum diset', 500, 'JWT_SECRET belum diset');
            }
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return AppError(res, { token }, 200, 'Login berhasil');
        });
    }
}
module.exports = new LoginController();
