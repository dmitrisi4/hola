import { object, string, literal, type output } from "zod";

export const signupSchema = object({
  email: string().min(1, "Email is required").email("Enter a valid email"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  confirmPassword: string().min(1, "Please confirm your password"),
  acceptTerms: literal(true),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupFormData = output<typeof signupSchema>;

export type PasswordStrength = "weak" | "medium" | "strong";

export function getPasswordStrength(password: string): {
  level: PasswordStrength;
  score: number;
  checks: { length: boolean; upper: boolean; lower: boolean; number: boolean; special: boolean };
} {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let level: PasswordStrength;
  if (score <= 2) level = "weak";
  else if (score <= 4) level = "medium";
  else level = "strong";

  return { level, score, checks };
}
