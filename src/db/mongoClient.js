const { MongoClient } = require('mongodb');

const mongoConnectionUri = require('../config/envConfig')


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

const createCollectionOperations = async (collectionName, indexes = []) => {
  const db = getDb();
  const collections = await db.listCollections({ name: collectionName }).toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName);
    console.log(`Collection '${collectionName}' created successfully`);
  } else {
  }

  if (indexes.length > 0) {
    const collection = db.collection(collectionName);
    for (const index of indexes) {
      await collection.createIndex(index.fields, index.options || {});
    }
  }
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
  createCollectionOperations,
  close
};