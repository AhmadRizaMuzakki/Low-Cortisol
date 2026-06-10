const AppError = (res, error, status, message) => {
    if (error) console.log(error);
    res.status(status).json({
        success: false,
        message: message,
        error: error?.message ?? error ?? null,
    });
}

module.exports = AppError;