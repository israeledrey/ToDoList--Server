const { ObjectId } = require("mongodb");

const { getDb } = require('../config/mongoClient.js')




const getAllTasks = async (req, res) => {
    try {
        const db = getDb();
        const tasksCollection = db.collection("tasks");
        const tasks = await tasksCollection.find().toArray();
        res.json(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

const createTask = async (req, res) => {
    try {
        const db = getDb();
        const tasksCollection = db.collection("tasks");
        const newTask = await tasksCollection.insertOne(req.body)

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
}


const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    const updates = req.body;
    

    try {
        const db = getDb();
        const tasksCollection = db.collection("tasks");

        console.log("Updating task with ID:", taskId);
        delete updates._id;

        const idToUpdate = ObjectId.isValid(taskId) ? new ObjectId(taskId) : taskId;
        const updatedTask = await tasksCollection.findOneAndUpdate(
            { _id: idToUpdate },
            { $set: updates },
            { returnDocument: "after" }
        );

        if (!updatedTask.value) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({ message: "Task updated successfully", task: updatedTask.value });
    } catch (error) {
        console.error("Error updating task:", error.message, error.stack);
        res.status(500).json({ error: "Failed to update task", details: error.message });
    }
};


const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    console.log(`Backend - Deleting task with ID: ${taskId}`);

    try {
        const db = getDb();
        const tasksCollection = db.collection("tasks");
        const task = await tasksCollection.findOneAndDelete({ _id: new ObjectId(taskId) });

        if (!task) {
            return res.status(404).json('Task not found');
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting Task', error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};