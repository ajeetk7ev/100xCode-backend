import type { ErrorRequestHandler } from "express";
import ApiError from "../utils/apiError.ts";
import logger from "../config/logger.ts";

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  logger.error(`[${req.method}] ${req.originalUrl} - ${error.statusCode} - ${error.message}`);
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: error.success,
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors,
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal server error",
    errors: [],
  });
};

export default errorHandler;
