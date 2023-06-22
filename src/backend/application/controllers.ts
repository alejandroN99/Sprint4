import * as dataJson from '../infrastructure/data.json';
import { ItareasInterface, Tarea } from '../domain/claseTareas';
import {Request,Response,NextFunction} from 'express';

const getAllTasks = (_req: Request,res: Response) => {
	res.json(dataJson.tasks);
};

const getTask = (req:Request, res:Response) => {
    const id: number = Number(req.params.id);
	const task: ItareasInterface | undefined = dataJson.tasks.find((tarea: ItareasInterface) => tarea.id === id);

	if (!task) {
        return res.status(404).send('Task not found')
	};

	res.send(task);
};

const createdTask = (req:Request, res:Response) => {
    const newTask: ItareasInterface = new Tarea(dataJson.tasks.length + 1,req.body.tittle,req.body.description,req.body.completed); 
	console.log(req.body);
    dataJson.tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req:Request,res:Response) => {
	const id = Number(req.params.id);
	const index: number = dataJson.tasks.findIndex(tarea => tarea.id === id);
	
	if(index === -1) {
		return res.status(404).send('Task not found');
	};

    const updateTarea: ItareasInterface = {
		id: dataJson.tasks[index].id,
		tittle: dataJson.tasks[index].tittle,
		description: dataJson.tasks[index].description,
		completed: req.body.completed
	};
	
	dataJson.tasks[index] = updateTarea;
	res.status(200).send('Task Update');
};

const deleteTask = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = dataJson.tasks.findIndex(tarea => tarea.id === id)
        if (index === -1) {
        return res.status(404).send('Task not found')
    }
    dataJson.tasks.splice(index,1)
    res.status(200).send('Task deleted')
};

export {getAllTasks,getTask,createdTask,updateTask,deleteTask};