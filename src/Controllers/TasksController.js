import { connectToMongo } from '../Config/ConnectedMongo.js'
import { ObjectId } from "mongodb";
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


export const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    const updates = req.body;

    try {
        await connectToMongo();
        const tasksCollection = mongoose.connection.db.collection("tasks");

        console.log("Updating task with ID:", taskId);
        delete updates._id;

        const updatedTask = await tasksCollection.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(taskId) },
            { $set: updates },
            { returnDocument: "after" } 
        );

        res.json({ message: "Task updated successfully", task: updatedTask.value });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task" });
    }
};


export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    console.log(`Backend - Deleting task with ID: ${taskId}`);

    try {
        await connectToMongo();
        const tasksCollection = mongoose.connection.db.collection("tasks");
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