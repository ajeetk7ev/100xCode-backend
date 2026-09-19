import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.ts';
import notFoundHandler from './middlewares/notFoundHandler.ts';
dotenv.config();

const app = express();

app.use(notFoundHandler);

app.get("/health", (_,res) => {
    
    res.send({
        message:"Server is running fine",
        upTime:process.uptime()
    })
})

app.use(errorHandler);


export {app};