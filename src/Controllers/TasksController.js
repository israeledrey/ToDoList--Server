import { connectToMongo } from '../Config/ConnectedMongo.js'
import mongoose from 'mongoose';



export const getAllTasks = async (req, res) => {
    try {
        await connectToMongo(); 
        const tasksCollection = mongoose.connection.db.collection("tasks");
        const tasks = await tasksCollection.find().toArray(); 
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

export const createTask = async (req, res) => {
    try {
        await connectToMongo();
        const tasksCollection = mongoose.connection.db.collection("tasks");    
        const newTask = await tasksCollection.insertOne(req.body)
        console.log("New Task:", newTask);

        res.status(201).json(newTask);
    } catch (error) { 
        res.status(500).json({ error: "Failed to create task" });
    }
}

export const updateStatusTask = async (req, res) => {
    const taskId = req.params._id;
    const { status } = req.body;

    try {
        await connectToMongo();
        const tasksCollection = mongoose.connection.db.collection("tasks");
        const result = await tasksCollection.updateOne(
            { id: taskId }, 
            { $set: { status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task status updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update task status" });
    }
}


export const deleteTask = async (req, res) => {
    const taskId = req.params._id;
    console.log(`Deleting task with ID: ${taskId}`); 


    try{
        await connectToMongo();
        const tasksCollection = mongoose.connection.db.collection("tasks");
        const task = await tasksCollection.findOne({ id : taskId });
        if (!task) {
            return res.status(404).json('Task not found');
        }
        await tasksCollection.deleteOne({ id: taskId })

        if (deleteTask.deletedCount === 0){
            res.status(404).json({ message: 'Task not found' });
            return; 
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }catch(error){
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting Task', error });
    }
}