import type { Request, Response } from "express";
import AuthService from "../../services/auth/auth.service.ts";
import ApiResponse from "../../utils/apiResponse.ts";

class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const newUser = await AuthService.register(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, "User Registered Successfully", newUser));
  }
}

export default AuthController;
