const envConfig = require('./config/envConfig')
const { connectToMongo, createCollectionOperations } = require("./config/mongoClient");

const app = require("./app");




connectToMongo().then(async() => {
  console.log('MongoDB connected successfully');

  await createCollectionOperations('tasks', [
    { fields: { _id: 1 } },
    { fields: { subject: 1 } },
  ]);

  const PORT =  envConfig.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}).catch(error => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1);
});