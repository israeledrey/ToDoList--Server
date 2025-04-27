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
        res.status(500).json({error: error.message});
    }
}


const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    const updates = req.body;


    try {
        delete updates._id;
        const idToUpdate = ObjectId.isValid(taskId) ? new ObjectId(taskId) : taskId;
        const updatedTask = await getCollection("tasks").findOneAndUpdate(
            { _id: idToUpdate },
            { $set: updates },
            { returnDocument: "after" }
        );

        if (!updatedTask.value) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({ message: "Task updated successfully", task: updatedTask.value });
    } catch (error) {
        res.status(500).json({ error: "Failed to update task", details: error.message });
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

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};