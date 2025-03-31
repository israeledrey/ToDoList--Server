const express = require ("express");
const { getAllTasks, createTask, updateTask, deleteTask } = require('../Controllers/TasksController');
const taskSchema = require('../Schemas/TaskSchema');
const validateSchema = require('../Middlewares/validateSchema');


const router = express.Router();

router.get('/tasksList', getAllTasks);
router.post('/tasks/createTask', validateSchema(taskSchema), createTask);
router.put('/tasksList/:id', validateSchema(taskSchema), updateTask);
router.delete('/tasksList/:id', deleteTask)


module.exports = router;