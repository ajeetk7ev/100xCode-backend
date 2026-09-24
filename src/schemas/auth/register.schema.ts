import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstname: z
      .string({
        error: "First name is required",
      })
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters"),

    middlename: z
      .string()
      .trim()
      .max(50, "Middle name must not exceed 50 characters")
      .optional()
      .or(z.literal("")),

    lastname: z
      .string({
        error: "Last name is required",
      })
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters"),

    email: z
      .string({
        error: "Email is required",
      })
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address")
      .max(255, "Email must not exceed 255 characters"),

    country: z
      .string({
        error: "Country is required",
      })
      .trim()
      .min(2, "Country must be at least 2 characters")
      .max(100, "Country must not exceed 100 characters"),

    state: z
      .string({
        error: "State is required",
      })
      .trim()
      .min(2, "State must be at least 2 characters")
      .max(100, "State must not exceed 100 characters"),

    password: z
      .string({
        error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string({
        error: "Confirm password is required",
      })
      .min(1, "Please confirm your password"),
  }),

  params: z.object({}),
  query: z.object({}),
}).refine(
  (data) => data.body.password === data.body.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["body", "confirmPassword"],
  }
);

export type RegisterInput = z.infer<typeof registerSchema>["body"];