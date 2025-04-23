const express = require ("express");
const cors = require ('cors');

const tasksRoutes = require ('./routes/tasksRoutes');


const app = express();

app.use(express.json());
app.use(cors());
app.use(tasksRoutes);


module.exports = app;
