const { StatusCodes } = require("http-status-codes");

const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
  
    next(); 
  };
  
  module.exports = validateSchema;