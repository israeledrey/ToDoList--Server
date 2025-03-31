const app = require("./app");
const { connectToMongo } = require("./Config/ConnectedMongo");

connectToMongo();


const port =  3000;

connectToMongo().then(() => {
  console.log('MongoDB connected successfully');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to connect to MongoDB:', error);
});