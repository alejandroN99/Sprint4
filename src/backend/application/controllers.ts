import * as dataJson from '../infrastructure/data.json';
import { TareasInterface, Tarea } from '../domain/claseTareas';
import {Request,Response,NextFunction} from 'express';

const getAllTasks = (req: Request,res: Response) => {
	res.json(dataJson.tasks);
};

const getTask = (req:Request, res:Response) => {
    const id: number = Number(req.params.id);
	const task: TareasInterface | undefined = dataJson.tasks.find((tarea: TareasInterface) => tarea.id === id);

	if (!task) {
        return res.status(404).send('Task not found')
	};

	res.send(task);
};

const createdTask = (req:Request, res:Response) => {
    const newTask: TareasInterface = new Tarea(dataJson.tasks.length + 1,req.body.tittle,req.body.description,req.body.completed); 
	
    dataJson.tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req:Request,res:Response) => {
	const id = Number(req.params.id);
	const index: number = dataJson.tasks.findIndex(tarea => tarea.id === id);
	
	if(index === -1) {
		return res.status(404).send('Task not found');
	};

    const updateTarea: TareasInterface = {
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