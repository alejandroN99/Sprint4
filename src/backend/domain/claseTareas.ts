export interface TareasInterface{
    id: number,
    tittle: string,
    description: string,
    completed: boolean
}

export class Tarea implements TareasInterface{
    public id : number
    public tittle: string
    public description: string
    public completed: boolean

    constructor(id: number,tittle: string,description: string,completed: boolean){
        this.id = id;
        this.tittle = tittle;
        this.description = description;
        this.completed = completed;
    }
}