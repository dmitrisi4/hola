import { describe, it, expect } from "vitest";

import { loginSchema } from "./loginValidation";

describe("loginSchema", () => {
  it("passes with valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it("fails with empty email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "secret123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email?.[0]).toBe("Email is required");
    }
  });

  it("fails with invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "secret123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email?.[0]).toBe("Enter a valid email");
    }
  });

  it("fails with empty password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password?.[0]).toBe("Password is required");
    }
  });
});
