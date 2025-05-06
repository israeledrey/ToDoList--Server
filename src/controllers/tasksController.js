const { ObjectId } = require("mongodb");
const { StatusCodes } = require ('http-status-codes');
const { getCollection } = require("../db/mongoClient")



const getAllTasks = async (req, res) => {
        const tasks = await getCollection("tasks").find().toArray();
        res.json(tasks);
};

const createTask = async (req, res) => {
        const newTask = await getCollection("tasks").insertOne(req.body)
        res.status(StatusCodes.CREATED).json(newTask);
}


const updateTask = async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).send('Invalid ID');
        }

        const task = await getCollection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updates },
            { returnDocument: 'after' }
        );

        if (!task) {
            return res.status(StatusCodes.NOT_FOUND).send('Task not found');
        }

        res.send(task);
};


const deleteTask = async (req, res) => {
    const taskId = req.params.id;

        const task = await getCollection("tasks").findOneAndDelete({ _id: new ObjectId(taskId) });

        if (!task) {
            return res.status(StatusCodes.NOT_FOUND).json('Task not found');
        }

        res.status(StatusCodes.OK).json({ message: 'Task deleted successfully' });
}


const filteredTasks = async (req, res) => {
      const { name, completed } = req.query;
      const filter = {};
  
      if (name) {
        filter.name = { $regex: name, $options: 'i' };
      }
  
      if (completed !== undefined) {
        filter.completed = completed === 'true';
      }
  
      const tasks = await getCollection("tasks")
        .find(filter)
        .toArray();
  
      res.status(StatusCodes.OK).json(tasks);
  };


const getSubjectOption = async (req, res) => {
        const subjects = await getCollection("taskSubject").find().toArray();
        res.json(subjects);
}


module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    filteredTasks,
    getSubjectOption
};