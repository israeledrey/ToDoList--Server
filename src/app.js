const express = require ("express");
const cors = require ('cors');
const errorHandler = require ('./utils/errorHandler')

const tasksRoutes = require ('./routes/tasksRoutes');


const app = express();

app.use(express.json());
app.use(cors());
app.use(tasksRoutes);
app.use(errorHandler);


module.exports = app;
