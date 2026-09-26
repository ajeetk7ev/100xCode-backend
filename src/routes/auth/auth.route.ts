import { Router } from "express";
const router = Router();

import AuthController from "../../controllers/auth/auth.controller.ts";
import { validate } from "../../middlewares/validate.ts";
import { registerSchema } from "../../schemas/auth/register.schema.ts";
import asyncHandler from "../../utils/asyncHandler.ts";
import { loginSchema } from "../../schemas/auth/login.schema.ts";

const authController = new AuthController();

router.post("/register", validate(registerSchema), asyncHandler(authController.register));
router.post("/login", validate(loginSchema), asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refreshAuthToken));

export default router;