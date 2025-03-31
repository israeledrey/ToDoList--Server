const { MongoClient } = require ('mongodb');
const dotenv = require ('dotenv');


dotenv.config();

const uri = process.env.MONGODB_URI || '';
let client;

const connectToMongo = async () => {
  if (!client || !client.topology || !client.topology.isConnected()) {
      try {
          client = new MongoClient(uri);
          await client.connect();
      } catch (error) {
          console.error('MongoDB connection error:', error);
          throw error;
      }
  }
  return client;
};


const getDb = () => {
  if (!client) throw new Error('MongoDB client is not connected');
  return client.db(); 
};


const close = async () => {
  if (client && client.topology && client.topology.isConnected()) {
      await client.close();
      console.log('MongoDB connection closed');
  }
};


module.exports = {
  connectToMongo,
  getDb,
  close
};