const AppError = require('../utils/AppError');

function Authorize(...allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user && req.user.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return AppError(
                res,
                'You are not authorized to access this resource',
                403,
                'You are not authorized to access this resource'
            );
        }
        next();
    };
}

module.exports = Authorize;
