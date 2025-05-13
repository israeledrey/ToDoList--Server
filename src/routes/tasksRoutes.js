const express = require ("express");

const { getAllTasks, createTask, updateTask, deleteTask, filteredTasks, getSubjectOption } = require('../controllers/tasksController');
const taskSchema = require('../schemas/taskSchema');
const validateSchema = require('../middlewares/validateSchema');


const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks/createTask', validateSchema(taskSchema), createTask);
router.put('/tasks/:id', validateSchema(taskSchema), updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/filter', filteredTasks);
router.get('/tasks/taskSubject', getSubjectOption);


module.exports = router;