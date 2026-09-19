import type { RequestHandler } from "express";
import ApiError from "../utils/apiError.ts";

const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};


export default notFoundHandler;