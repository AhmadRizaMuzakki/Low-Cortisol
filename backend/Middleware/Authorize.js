const AppError = require('../utils/AppError');

function Authorize(role) { 
    return (req, res, next) => {
        const { role } = req.user;
    if (role !== 'admin') {
        return AppError(res, 'You are not authorized to access this resource', 403, 'You are not authorized to access this resource');
    } else {
        next();
    }
    if (role !== 'guru') {
        return AppError(res, 'You are not authorized to access this resource', 403, 'You are not authorized to access this resource');
    } else {
        next();
    }
    if (role !== 'siswa') {
        return AppError(res, 'You are not authorized to access this resource', 403, 'You are not authorized to access this resource');
    } else {
            next();
        }
    }
}
module.exports = Authorize;