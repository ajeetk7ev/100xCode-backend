import type { ErrorRequestHandler } from "express";
import ApiError from "../utils/apiError.ts";



const errorHandler:ErrorRequestHandler = (error, req, res, next) => {
    if(error instanceof ApiError){
        return res.status(error.statusCode).json({
            success:error.success,
            statusCode:error.statusCode,
            messasge:error.message,
            errors:error.errors
        })
    }


    return res.status(500).json({
        success:false,
        statusCode:500,
        message:"Internal server error",
        errors:[]
    })
}


export default errorHandler;