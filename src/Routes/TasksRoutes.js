import express from "express";
import {getAllTasks, createTask, updateTask, deleteTask} from '../Controllers/TasksController.js'

const router = express.Router();

router.get('/tasksList', getAllTasks);
router.post('/tasks/createTask', createTask);
router.put('/tasksList/:id', updateTask);
router.delete('/tasksList/:id', deleteTask)


export default router;