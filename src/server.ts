import express, { json } from 'express';
import dotenv from "dotenv";
import mediaRouter from './routes/mediaRouter.js';

dotenv.config();

const server = express();

server.use(json());
server.use(mediaRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}.`);
});