import env from "../config/env.ts";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;

export interface TokenVerificationResult {
  valid: boolean;
  expired: boolean;
  decoded: JwtPayload | null;
}

export function verifyAccessToken(token: string): TokenVerificationResult {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}

export function verifyRefreshToken(token: string): TokenVerificationResult {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
    
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}

export function generateAccessToken(payload: object): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export function generateTokens(payload: {
  userId: string;
  role: string;
}) {
  const accessToken = generateAccessToken({
    userId: payload.userId,
    role: payload.role,
  });

  const refreshToken = generateRefreshToken({
    userId: payload.userId,
  });

  return {
    accessToken,
    refreshToken,
  };
}