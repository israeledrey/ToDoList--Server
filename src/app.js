const express = require ("express");
const cors = require ('cors');

const TasksRoutes = require ('./Routes/TasksRoutes.js');


const app = express();

app.use(express.json());
app.use(cors());
app.use(TasksRoutes);


module.exports = app;
