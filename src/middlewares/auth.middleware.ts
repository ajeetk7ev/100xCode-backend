import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.ts";
import { verifyAccessToken } from "../utils/jwt.ts";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  // 1. Try Authorization header
  const authHeader = req.headers.authorization;

  let accessToken: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    accessToken = authHeader.split(" ")[1];
  }

  // 2. Fallback to cookie
  if (!accessToken) {
    accessToken = req.cookies?.accessToken;
  }

  // 3. No token found
  if (!accessToken) {
    throw new ApiError(401, "Access token is required");
  }

  // 4. Verify access token
  const result = verifyAccessToken(accessToken);

  if (!result.valid || !result.decoded) {
    if (result.expired) {
      throw new ApiError(401, "Access token expired");
    }

    throw new ApiError(401, "Invalid access token");
  }

  // 5. Attach authenticated user to request
  req.user = {
    userId: result.decoded.userId,
    role: result.decoded.role,
  };

  next();
};