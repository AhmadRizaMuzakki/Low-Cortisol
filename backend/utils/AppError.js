const AppError = (res, error, status, message) => {
    console.log(error);
    res.status(status).json({
        success: false,
        message: message,
        error: error.message || error
    });
}

module.exports = AppError;