import { prisma } from "../../config/prisma.ts";
import { OtpPurpose } from "../../generated/prisma/enums.ts";

export class OtpRepository {
  /**
   * Create a new OTP
   */
  static async createOtp(data: {
    email: string;
    otp: string;
    purpose: OtpPurpose;
    expiresAt: Date;
  }) {
    return await prisma.otp.create({
      data: {
        email: data.email,
        otp: data.otp,
        purpose: data.purpose,
        expiresAt: data.expiresAt,
      },
    });
  }

  /**
   * Find OTP for a specific email and purpose
   */
  static async findOtp(
    email: string,
    purpose: OtpPurpose
  ) {
    return await prisma.otp.findFirst({
      where: {
        email,
        purpose,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Increment failed verification attempts
   */
  static async incrementAttempts(id: string) {
    return await prisma.otp.update({
      where: {
        id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Delete OTP after successful verification
   */
  static async deleteOtp(id: string) {
    return await prisma.otp.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Delete existing OTP for email + purpose
   */
  static async deleteOtpByEmail(
    email: string,
    purpose: OtpPurpose
  ) {
    return await prisma.otp.deleteMany({
      where: {
        email,
        purpose,
      },
    });
  }
}