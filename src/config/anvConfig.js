require('dotenv/config');


module.exports = {
  mongoURI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV || 'development',
};