const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const Auth = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return AppError(res, 'Bearer token is required', 401, 'Bearer token is required');
    }
    const token = bearer.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return AppError(res, error, 401, 'Unauthorized');
    }
}
module.exports = Auth;