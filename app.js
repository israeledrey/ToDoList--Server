import express from "express";
import cors from 'cors';
import TasksRoutes from './src/Routes/TasksRoutes.js'
import { connectToMongo } from './src/Config/ConnectedMongo.js'


const app = express();
const port =  3000;


app.use(express.json());
app.use(cors());
app.use(TasksRoutes);



connectToMongo().then(() => {
  console.log('MongoDB connected successfully');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to connect to MongoDB:', error);
});