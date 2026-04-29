const AppError = require('../utils/AppError');

function Authorize(...allowedRoles) { 
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return AppError(res, 'Unauthorized', 401, 'Unauthorized');
        }

        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
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