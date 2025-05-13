const { StatusCodes } = require('http-status-codes');


const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "An unexpected error occurred",
        details: err.message || 'No additional details available',
    });
};

module.exports = errorHandler;