const { MongoClient } = require('mongodb');

const mongoConnectionUri = require('./envConfig')


const uri = mongoConnectionUri.mongoURI;
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

const getCollection = (collectionName) => {
  const db = getDb();  
  return db.collection(collectionName);
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
  getCollection,
  close
};