import {app, server} from "../../src/backend/infrastructure/app";
import request from "supertest";
import * as dataJson from "../../src/backend/infrastructure/data.json";
import { Tarea } from "../../src/backend/domain/claseTareas";

describe('GET/tasks', () => {
    afterAll(() => {
        server.close();
    });

    test('should response with a status 200 and return array with tasks ', async () => {
        const response = await request(app)
        .get("/task")
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(dataJson.tasks);
    });

    test('given the id of a task, should response with a status 200 and return object with the task', async () => {
        const taskId = 1;

        const response = await request(app)
        .get(`/task/${taskId}`)
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(dataJson.tasks.find((tarea) => tarea.id === taskId));
    });

    test('given the id of a task, should response with a status 404', async () => {
        const taskId = 7;

        const response = await request(app)
        .get(`/task/${taskId}`)
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))
    
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('Task not found')
    });
});

describe('POST/tasks',() => {
    afterAll(() => {
        server.close();
    });

    test('should create a new task successfully', async () => {
        const newTask: Tarea = new Tarea(4,'Escribir codigo','Escribir funcion tareas',false);
        const response = await request(app)
        .post("/task")
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))
        .send(newTask);

        expect(response.body).toEqual(newTask);
        expect(response.status).toBe(201);
    });
});

describe('UPDATE/tasks', () => {
    test('should update an existing task successfully', async () => {
        const taskUpdate = {
            "completed": true
        }

        const response = await request(app)
        .put("/task/3")
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))
        .send(taskUpdate);

        expect(response.status).toBe(200);
        expect(response.text).toEqual("Task Update");

        const taskResponse = await request(app).get(`/task/3`)
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))
        expect(taskResponse.body.completed).toEqual(taskUpdate.completed);
    });

    test('should return a 404 status code if the task ID does not exist', async () => {
        const taskUpdate = {
            "completed": true
        }

        const response = await request(app)
        .put("/task/7")
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))
        .send(taskUpdate);

        expect(response.status).toBe(404);
        expect(response.text).toBe("Task not found");

    });
});

describe('DELETE/tasks', () => {
    test('should delete an existing task successfully', async () => {
        const response = await request(app)
        .delete("/task/1")
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'))

        expect(response.status).toBe(200);
        expect(response.text).toBe('Task deleted');

        const taskResponse = await request(app)
        .get(`/task/1`)
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'));

        expect(taskResponse.status).toBe(404);
        expect(taskResponse.text).toBe('Task not found');
    });

    test('should return a 404 status code if the task ID does not exist', async () => {
        const response = await request(app)
        .delete('/task/9')
        .set('Authorization', 'Basic ' + Buffer.from('user:password').toString('base64'));

        expect(response.status).toBe(404);
        expect(response.text).toBe('Task not found');
      });
})