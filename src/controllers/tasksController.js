const { StatusCodes } = require("http-status-codes");
const tasksDal = require("../dal/taskDal");

const getAllTasks = async (req, res) => {
  const tasks = await tasksDal.getAll("tasks");
  res.json(tasks);
};

const createTask = async (req, res) => {
  const now = new Date();
  const taskToInsert = { ...req.body, createdAt: now, updatedAt: now };
  const newTask = await tasksDal.create("tasks", taskToInsert);
  res.status(StatusCodes.CREATED).json(newTask);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body, updatedAt: new Date() };
  const updatedTask = await tasksDal.update("tasks", id, updatedData);

  if (!updatedTask) {
    return res.status(StatusCodes.NOT_FOUND).send("Task not found or invalid ID");
  }

  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const deleted = await tasksDal.remove("tasks", id);

  if (!deleted) {
    return res.status(StatusCodes.NOT_FOUND).json("Task not found or invalid ID");
  }

  res.status(StatusCodes.OK).json({ message: "Task deleted successfully" });
};

const filteredTasks = async (req, res) => {
  const { name } = req.query;
  const tasks = await tasksDal.filterByName("tasks", name);
  res.status(StatusCodes.OK).json(tasks);
};

const getSubjectOption = async (req, res) => {
  const subjects = await tasksDal.getSubjects("taskSubject");
  res.json(subjects);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  filteredTasks,
  getSubjectOption
};