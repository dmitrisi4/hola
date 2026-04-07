import { object, string, type output } from "zod";

export const loginSchema = object({
  email: string().min(1, "Email is required").email("Enter a valid email"),
  password: string().min(1, "Password is required"),
});

export type LoginFormData = output<typeof loginSchema>;
