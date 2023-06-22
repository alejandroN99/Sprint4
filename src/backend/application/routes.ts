import express from 'express';
export const router = express.Router();
import { getAllTasks,getTask,createdTask,updateTask,deleteTask } from './controllers';


router.get('/all', getAllTasks);

router.get('/:id', getTask);

router.post('/post', createdTask);

router.put('/put/:id', updateTask);

router.delete('/delete/:id', deleteTask);