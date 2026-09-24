

import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import ApiError from "../utils/apiError.js";


export const validate = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[issue.path.length - 1];

        if (typeof field === "string" && !errors[field]) {
          errors[field] = issue.message;
        }
      }

      return next(
        new ApiError(
          400,
          "Validation failed",
          errors
        )
      );
    }


    next();
  };
};