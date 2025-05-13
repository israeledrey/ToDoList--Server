const { ObjectId } = require("mongodb");
const { getCollectionOperations } = require("../db/mongoClient");

const tasksOps = getCollectionOperations("tasks");
const subjectsOps = getCollectionOperations("taskSubject");

const getAll = async () => {
  return await tasksOps.find();
};

const create = async (data) => {
  const now = new Date();
  const taskToInsert = { ...data, createdAt: now, updatedAt: now };
  return await tasksOps.insertOne(taskToInsert);
};

const update = async (id, data) => {
  if (!ObjectId.isValid(id)) return null;

  const updatedData = { ...data, updatedAt: new Date() };
  return tasksOps.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedData },
  );
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return tasksOps.findOneAndDelete({ _id: new ObjectId(id) });
};

const filterByName = async (name) => {
  const filteredName = name ? { name: { $regex: name, $options: "i" } } : {};
  return tasksOps.filterByName(filteredName)
};

const getSubjects = async () => {
  return await subjectsOps.find();
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  filterByName,
  getSubjects
};