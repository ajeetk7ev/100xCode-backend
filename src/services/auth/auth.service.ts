import bcrypt from "bcryptjs";
import UserRepository from "../../repositories/user/user.repositories.ts";
import ApiError from "../../utils/apiError.ts";
import { hashPassword, comparePassword } from "../../utils/bcrypt.ts";
import { generateTokens, verifyRefreshToken } from "../../utils/jwt.ts";
import generateOTP from "../../utils/otp.ts";
import { type Register } from "./auth.types.ts";
import { OtpRepository } from "../../repositories/otp/otp.repository.ts";
import { OtpHTMLTemplate } from "../email/template/otp.ts";
import { emailQueue } from "../../queue/email.queue.ts";
import transport from "../../config/nodemailer.ts";

class AuthService {
  static async register(data: Register) {
    const { firstname, middlename, lastname, email, country, state, password } =
      data;

    const user = await UserRepository.findUserByEmail(email);

    if (user) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await UserRepository.createUser({
      firstname,
      middlename,
      lastname,
      email,
      country,
      state,
      password: hashedPassword,
    });

    //also have to attach the token as well

    const { password: _password, ...safeUser } = newUser;

    const { accessToken, refreshToken } = generateTokens({
      userId: newUser.id,
      role: newUser.role,
    });

    return {
      safeUser,
      accessToken,
      refreshToken,
    };
  }

  static async login(data: {
  email: string;
  password?: string;
  otp?: string;
  method: "PASSWORD" | "OTP";
}) {
    const { email, password, otp, method } = data;
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(400, "Invalid user credentials");
    }

    if (method === 'PASSWORD') {
      const isPasswordMatch = comparePassword(user.password, password!);

      if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid user credentials");
      }
    } else {
      const otpRecord = await OtpRepository.findOtp(email, "LOGIN");

      if (!otpRecord) {
        throw new ApiError(400, "OTP not found");
      }

      if (otpRecord.expiresAt < new Date()) {
        await OtpRepository.deleteOtp(otpRecord.id);

        throw new ApiError(400, "OTP has expired");
      }

      if (otpRecord.attempts >= 5) {
        await OtpRepository.deleteOtp(otpRecord.id);

        throw new ApiError(429, "Too many OTP attempts");
      }

      const isValid = await bcrypt.compare(otp!, otpRecord.otp);

      if (!isValid) {
        await OtpRepository.incrementAttempts(otpRecord.id);

        throw new ApiError(400, "Invalid OTP");
      }

       await OtpRepository.deleteOtp(otpRecord.id);

      
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      role: user.role,
    });

    const { password: _password, ...safeUser } = user;

    return {
      safeUser,
      accessToken,
      refreshToken,
    };
  }

  static async refreshAuthToken(refreshToken: string) {
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token is required");
    }

    const result = verifyRefreshToken(refreshToken);

    if (!result.valid) {
      if (result.expired) {
        throw new ApiError(401, "Refresh token expired");
      }

      throw new ApiError(401, "Invalid refresh token");
    }

    const { userId, role } = result.decoded as { userId: string; role: string };

    return generateTokens({ userId, role });
  }

  static async getCurrentUser(userId: string) {
    const user = await UserRepository.findUserById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  static async sendOTP(data: { email: string; purpose: string }) {
    const { email, purpose } = data;

    if (!email || !purpose) {
      throw new ApiError(400, "Email and purpose are required");
    }

    const user = await UserRepository.findUserByEmail(email);

    if (user) {
      if (purpose === "LOGIN") {
        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);
        await OtpRepository.deleteOtpByEmail(email, "LOGIN");
        await OtpRepository.createOtp({
          email,
          otp: hashedOtp,
          purpose: "LOGIN",
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        //send otp on this email
        const htmlContent = OtpHTMLTemplate(
          user.firstname,
          otp,
          "log into your account",
        );

       

        await emailQueue.add(
          "send-otp-email",
          {
            to: email,
            subject: "Your 100xCode Login Verification Code",
            html: htmlContent,
            text: `Hi ${user.firstname},\n\nYou recently requested to ${purpose}. Please use the verification code below to complete this process:\n\n${otp}\n\nThis code will expire in 10 minutes.\nIf you didn't request this, you can safely ignore this email.`,
          },
          {
            attempts: 3, // Retry if Nodemailer fails
            backoff: {
              type: "exponential",
              delay: 1000,
            },
            removeOnComplete: true, // Keep Redis clean
          },
        );
      }
    }
  }
}

export default AuthService;
