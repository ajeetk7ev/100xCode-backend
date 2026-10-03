import z from "zod";

export const loginSchema = z
  .object({
    body: z.object({
      email: z
        .string({
          error: "Email is required",
        })
        .trim()
        .toLowerCase()
        .email("Please provide a valid email address")
        .max(255, "Email must not exceed 255 characters"),

      method: z.enum(["PASSWORD", "OTP"], {
        error: "Login method must be PASSWORD or OTP",
      }),

      password: z.string().optional(),

      otp: z
        .string()
        .regex(/^\d{6}$/, "OTP must be exactly 6 digits")
        .optional(),
    }),
  })
  .superRefine((data, ctx) => {
    const { method, password, otp } = data.body;

    if (method === "PASSWORD" && !password) {
      ctx.addIssue({
        code: "custom",
        path: ["body", "password"],
        message: "Password is required",
      });
    }

    if (method === "OTP" && !otp) {
      ctx.addIssue({
        code: "custom",
        path: ["body", "otp"],
        message: "OTP is required",
      });
    }
  });