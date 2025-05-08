const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/mongoClient");

const getAll = async (collection) => {
  return getCollection(collection).find().toArray();
};

const create = async (collection, data) => {
  const result = await getCollection(collection).insertOne(data);
  return { ...data, _id: result.insertedId };
};

const update = async (collection, id, data) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await getCollection(collection).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...data } },
    { returnDocument: "after" }
  );

  return result;
};

const remove = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await getCollection(collection).findOneAndDelete({ _id: new ObjectId(id) });
  return result;
};

const filterByName = async (collection, name) => {
  const filter = name ? { name: { $regex: name, $options: "i" } } : {};
  return getCollection(collection).find(filter).toArray();
};

const getSubjects = async (collection) => {
  return getCollection(collection).find().toArray();
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  filterByName,
  getSubjects
};