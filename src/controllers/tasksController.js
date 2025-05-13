const { StatusCodes } = require("http-status-codes");
const tasksDal = require("../dal/taskDal");

const getAllTasks = async (req, res) => {
  const tasks = await tasksDal.getAll();
  res.json(tasks);
};

const createTask = async (req, res) => {
  const newTask = await tasksDal.create(req.body);
  res.status(StatusCodes.CREATED).json(newTask);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await tasksDal.update(id, req.body);

  if (!updatedTask) {
    return res.status(StatusCodes.NOT_FOUND).send("Task not found or invalid ID");
  }

  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const deleted = await tasksDal.remove(id);

  if (!deleted) {
    return res.status(StatusCodes.NOT_FOUND).json("Task not found or invalid ID");
  }

  res.status(StatusCodes.OK).json({ message: "Task deleted successfully" });
};

const filteredTasks = async (req, res) => {
  const { name } = req.query;
  const tasks = await tasksDal.filterByName(name);
  res.status(StatusCodes.OK).json(tasks);
};

const getSubjectOption = async (req, res) => {
  const subjects = await tasksDal.getSubjects();
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