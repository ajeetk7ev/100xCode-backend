import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.ts';
import ApiError from './utils/apiError.ts';
dotenv.config();

const app = express();

app.get("/health", (_,res) => {
    res.send({
        message:"Server is running fine",
        upTime:process.uptime()
    })
})

app.use(errorHandler);


export {app};