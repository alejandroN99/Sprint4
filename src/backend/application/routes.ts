import express from 'express';
export const router = express.Router();
import { getAllTasks,getTask,createdTask,updateTask,deleteTask } from './controllers';


router.get('/task', getAllTasks);

router.get('/task/:id', getTask);

router.post('/task', createdTask);

router.put('/task/:id', updateTask);

router.delete('/task/:id', deleteTask);