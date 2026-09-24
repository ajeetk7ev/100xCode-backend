import env from "../config/env.ts";
import jwt, { type SignOptions } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;


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