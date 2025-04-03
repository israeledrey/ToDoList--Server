const express = require ("express");

const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/TasksController');
const taskSchema = require('../schemas/TaskSchema');
const validateSchema = require('../middlewares/validateSchema');


const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks/createTask', validateSchema(taskSchema), createTask);
router.put('/tasks/:id', validateSchema(taskSchema), updateTask);
router.delete('/tasks/:id', deleteTask)


module.exports = router;