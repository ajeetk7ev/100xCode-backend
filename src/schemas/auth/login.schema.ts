import z from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        error: "Email is required",
      })
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address")
      .max(255, "Email must not exceed 255 characters"),

    password: z.string({
      error: "Password is required",
    }),
  }),
});
