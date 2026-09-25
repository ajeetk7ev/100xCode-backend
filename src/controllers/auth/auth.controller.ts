import type { CookieOptions, Request, Response } from "express";
import AuthService from "../../services/auth/auth.service.ts";
import ApiResponse from "../../utils/apiResponse.ts";

class AuthController {
  private readonly refreshCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  private readonly accessCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  private setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) => {
    res.cookie("accessToken", accessToken, this.accessCookieOptions);
    res.cookie("refreshToken", refreshToken, this.refreshCookieOptions);
  };
  register = async (req: Request, res: Response): Promise<void> => {
    const { safeUser, accessToken, refreshToken } = await AuthService.register(
      req.body,
    );

    this.setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json(
      new ApiResponse(201, "User Registered Successfully", {
        user:safeUser,
        accessToken,
        refreshToken,
      }),
    );
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { safeUser, accessToken, refreshToken } = await AuthService.login(
      req.body,
    );

    this.setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json(new ApiResponse(200, "Logged In Successfully", {user:safeUser, accessToken, refreshToken}));
  };
}

export default AuthController;
