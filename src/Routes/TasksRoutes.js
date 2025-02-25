import express from "express";
import {getAllTasks, createTask, updateStatusTask, deleteTask} from '../Controllers/TasksController.js'

const router = express.Router();

router.get('/tasksList', getAllTasks);
router.post('/tasks/createTask', createTask);
router.put('/tasksList/:id', updateStatusTask);
router.delete('/tasksList/:id', deleteTask)


export default router;