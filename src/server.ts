import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.router";
import {pool} from "./config/db";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5013;
const BASE_URL = '/api/auth';

app.use(express.json());

app.use(BASE_URL,AuthRouter);


async function startApp(){
    pool.query(`SELECT NOW()`,(err) => {
        if(err) {
            console.error('Error connecting to the database', err.stack);
        } else {
            console.log('Connected to the database');
        }
    });

    app.listen(PORT,() => {
        console.log(`Server has been started on port:${PORT}`);
    });
}

startApp();