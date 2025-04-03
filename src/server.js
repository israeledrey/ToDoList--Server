const app = require("./app");

const envConfig = require('./config/anvConfig')
const { connectToMongo } = require("./config/mongoClient");



connectToMongo().then(() => {
  console.log('MongoDB connected successfully');

  const PORT =  envConfig.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}).catch(error => {
  console.error('Failed to connect to MongoDB:', error);
});