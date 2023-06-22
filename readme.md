# TODO API REST

I will create a server using Express.js, to serve the REST API of the task list (TODO-LIST), applying the hexagonal architecture.

### 📥 Installation

To get started with this template, you first need to clone the repository:

```bash
git clone https://github.com/alejandroN99/Sprint4.git
```

Then, install the project dependencies:

```bash
npm install
```

### 🏁 How To Start

To start the server in development mode, run the following script:
```bash
npm run dev
```
Then, open http://localhost:80 to access the server.


### 🚀 Production

To run the server in production mode, first build the TypeScript code into JavaScript by running:

```bash
npm run build
```

This will generate the dist directory with the compiled JavaScript files.

Then, start the server by running:

```bash
npm start
```

This will start the server and make it available at http://localhost:80.

## Índice

- [Rutas](#rutas)
- [Parámetros comunes](#parámetros-comunes)
- [Respuestas comunes](#respuestas-comunes)

## Rutas

### GET /task/all

Recupera todas las tareas disponibles.

#### Parámetros de consulta

Ninguno.

#### Respuesta exitosa

Código de estado: 200 OK

```json
{
    "tasks": [
        {
            "id": 1,
            "tittle": "Limpiar",
            "description": "Limpiar la cocina",
            "completed": true
        },
        {
            "id": 2,
            "tittle": "Cocinar",
            "description": "Hacer la cena",
            "completed": true
        },
        {
            "id": 3,
            "tittle": "Estudiar",
            "description": "Entregar sprint 7",
            "completed": false
        }
    ]
}
```
### GET /task/:id

Recupera una tarea por su id.

#### Parámetros de consulta

El id, ejemplo: 1.

#### Respuesta exitosa

Código de estado: 200 OK

```json
  
  {
    "id": 1,
    "tittle": "Limpiar",
    "description": "Limpiar la cocina",
    "completed": true
  }

```
#### Respuesta de error

Código de estado: 404 Not Found

Mensaje: Task not found

---

### POST /task/post

Crea una nueva tarea.

#### Parámetros de cuerpo

| Nombre      | Tipo   | Requerido | Descripción                      |
|-------------|--------|-----------|----------------------------------|
| tittle      | string | Sí        | Título de la tarea               |
| description | string | Sí        | Detalles adicionales de la tarea |
| completed   | boolean| Sí        | true/false                       |

#### Respuesta exitosa

Código de estado: 201 Created

```json
{
  "title": "Nueva tarea",
  "description": "Creando tarea de ejemplo",
  "completed": false
}
```
### PUT /task/put/:id

Modifica una tarea, para marcar como completada o no.

#### Parámetros de consulta

El id, ejemplo: 3.

Y le enviamos en el cuerpo de la consulta:
```json
{
    "completed": true
}
```

#### Respuesta exitosa

Código de estado: 200 OK

```json
  
  {
      "id": 3,
      "tittle": "Estudiar",
      "description": "Entregar sprint 7",
      "completed": true

  }
```
#### Respuesta de error

Código de estado: 404 Not Found

Mensaje: Task not found

---
### DELETE /task/delete/:id

Elimina una tarea.

#### Parámetros de consulta

El id, ejemplo: 2.

#### Respuesta exitosa

Código de estado: 200 OK

Mensaje: 'Task deleted'

```json
  [
        {
            "id": 1,
            "tittle": "Limpiar",
            "description": "Limpiar la cocina",
            "completed": true
        },
        {
            "id": 3,
            "tittle": "Estudiar",
            "description": "Entregar sprint 7",
            "completed": false
        }
    ]
```
#### Respuesta de error

Código de estado: 404 Not Found

Mensaje: Task not found

---

## Parámetros comunes

### Encabezados de autorización

Algunas rutas requieren autenticación básica mediante encabezados de autorización. Para enviar los encabezados de autorización, utiliza el formato "Basic base64(username:password)".

## Respuestas comunes

### Códigos de estado

- 200 OK: La solicitud se procesó correctamente.
- 201 Created: Se creó un nuevo recurso.
- 400 Bad Request: La solicitud contiene datos incorrectos o faltantes.
- 401 Unauthorized: La solicitud no está autenticada o las credenciales son incorrectas.
- 404 Not Found: El recurso solicitado no se encontró.

---