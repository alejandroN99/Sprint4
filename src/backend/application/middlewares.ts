import {Request,Response,NextFunction} from 'express';

// Middleware para añadir la cabecera Cache-Control: no-cache
export const middleware1 = (req:Request, res:Response, next:NextFunction) => {
  res.setHeader("Cache-Control", "no-cache");
  next();
};

//Middleware para habilitar CORS
export const middleware2 = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};


// Middleware para verificar la autenticación básica
export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
  
    if (username === 'user' && password === 'password') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
};
  
