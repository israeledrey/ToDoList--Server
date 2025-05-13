const { MongoClient, ObjectId } = require('mongodb');

const config = require('../config/envConfig')


const uri = config.mongoURI;
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

const getCollectionOperations = (collection) => {

  const find = async () => await getCollection(collection).find().toArray();

  const insertOne = async (document) => await getCollection(collection).insertOne(document);

  const findOneAndUpdate = async (query, payload, options = {} ) => await getCollection(collection).findOneAndUpdate(query, payload, { returnDocument: "after", ...options });

  const findOneAndDelete = async (query) => await getCollection(collection).findOneAndDelete(query);

  const filterByName = async (name) => await getCollection(collection).find(name).toArray();

  return {
    find,
    insertOne,
    findOneAndUpdate,
    findOneAndDelete,
    filterByName
  }
}


module.exports = {
  connectToMongo,
  getDb,
  close,
  getCollection,
  createCollectionOperations,
  getCollectionOperations
};