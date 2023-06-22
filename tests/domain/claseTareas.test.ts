import { Tarea } from "../../src/backend/domain/claseTareas";
import * as dataJson from "../../src/backend/infrastructure/data.json";

describe('Class Tareas', () => {
    test('task class test, we check that the constructor works correctly and correctly returns the created object, makes the push and checks the length of the array.', () => {

        const result = new Tarea(4,'tittle', 'description',true);
        const expectedResult = {
            "id": 4,
            "tittle": 'tittle',
            "description": 'description',
            "completed": true
        };

        dataJson.tasks.push(result);

        expect(result).toEqual(expectedResult);
        expect(dataJson.tasks.length).toBe(4);
        expect(dataJson.tasks[dataJson.tasks.length-1]).toEqual(expectedResult);
    });
});