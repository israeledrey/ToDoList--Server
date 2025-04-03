const { MongoClient } = require('mongodb');

const anvConfig = require('./anvConfig')


const uri = anvConfig.mongoURI;
let client;

const connectToMongo = async () => {
  if (client) {
    return client; 
  }
  
  client = new MongoClient(uri);
  return client.connect(); 
};


const getDb = () => {
  if (!client) throw new Error('MongoDB client is not connected');
  return client.db();
};


const close = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};


module.exports = {
  connectToMongo,
  getDb,
  close
};