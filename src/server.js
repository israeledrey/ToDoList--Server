const envConfig = require('./config/envConfig')
const { connectToMongo, createCollectionOperations } = require("./db/mongoClient");

const app = require("./app");


const initializeDatabase = async () => {
  await createCollectionOperations('tasks', [
    { fields: { _id: 1 } },
    { fields: { subject: 1 } },
  ]);
};


connectToMongo().then(async() => {
  await initializeDatabase();

  const PORT =  envConfig.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}).catch(error => {
  console.log('❌ Failed to start the application:', error);
  process.exit(1);
});