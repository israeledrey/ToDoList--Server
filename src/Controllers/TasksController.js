const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/mongoClient")



const getAllTasks = async (req, res) => {
    try {
        const tasks = await getCollection("tasks").find().toArray();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

const createTask = async (req, res) => {
    try {
        const newTask = await getCollection("tasks").insertOne(req.body)
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const updates = req.body;


        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }

        const task = await getCollection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updates },
            { returnDocument: 'after' }
        );

        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.send(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
};


const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await getCollection("tasks").findOneAndDelete({ _id: new ObjectId(taskId) });

        if (!task) {
            return res.status(404).json('Task not found');
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Task', error });
    }
}


const filteredTasks = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "Name query parameter is required" });
        }

        const tasks = await getCollection("tasks")
            .find({ name: { $regex: name, $options: 'i' } })
            .toArray();

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to filter tasks", details: error.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    filteredTasks
};