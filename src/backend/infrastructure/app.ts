import express from "express";
import {router} from '../application/routes';
import { basicAuth, middleware1, middleware2 } from "../application/middlewares";



export const app = express();

export const server = app.listen(80, () => {
	console.log('App listening on port 80!');
});

app.use(express.json());
app.use('',[middleware1,middleware2,basicAuth]);
app.use('', router);

